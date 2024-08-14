package systemFacade

import (
	"errors"
	"github.com/KerbsOD/TusLibros/internal/cart"
	"github.com/KerbsOD/TusLibros/internal/cartSession"
	"github.com/KerbsOD/TusLibros/internal/creditCard"
	"github.com/KerbsOD/TusLibros/internal/salesBook"
	"github.com/KerbsOD/TusLibros/internal/testsObjects/mocks/clock"
	"github.com/KerbsOD/TusLibros/internal/testsObjects/mocks/merchantProcessor"
	"github.com/KerbsOD/TusLibros/internal/testsObjects/mocks/userAuthentication"
	"time"
)

type SystemFacade struct {
	catalog           map[string]int
	userAuthSystem    userAuthentication.UserAuthentication
	cartSessions      map[int]*cartSession.CartSession
	merchantProcessor merchantProcessor.MerchantProcessor
	clock             clock.Clock
	salesBook         *salesBook.SalesBook
}

func NewFacade(
	aCatalog map[string]int,
	aUserAuthSystem userAuthentication.UserAuthentication,
	aMerchantProcessor merchantProcessor.MerchantProcessor,
	aClock clock.Clock,
) *SystemFacade {
	sf := new(SystemFacade)
	sf.catalog = aCatalog
	sf.userAuthSystem = aUserAuthSystem
	sf.cartSessions = map[int]*cartSession.CartSession{}
	sf.merchantProcessor = aMerchantProcessor
	sf.clock = aClock
	sf.salesBook = salesBook.NewSalesBook()
	return sf
}

// API //

// CreateCart
// Recurso: /createCart
// Parámetros:
// clientId: ID del cliente que está creando el carrito
// password: Password del cliente que válida que puede operar con TusLibros.com
// Output:
// En caso de éxito: 0|ID_DEL_CARRITO
// En caso de error: 1|DESCRIPCIÓN_DE_ERROR/*
func (sf *SystemFacade) CreateCart(aUsername, aPassword string) (int, error) {
	if !sf.userAuthSystem.RegisteredUser(aUsername, aPassword) {
		return -1, errors.New(InvalidUserOrPasswordErrorMessage)
	}
	aCartID := sf.generateCartID()
	aCartSession := cartSession.NewCartSession(aUsername, cart.NewCart(sf.catalog), sf.clock)
	sf.cartSessions[aCartID] = aCartSession
	return aCartID, nil
}

// AddToCart
// Recurso: /addToCart
// Parámetros:
// cartId: Id del carrito creado con /createCart
// bookIsbn: ISBN del libro que se desea agregar. Debe ser un ISBN de la editorial
// bookQuantity: Cantidad de libros que se desean agregar. Debe ser >= 1.
// Output:En caso de éxito: 0|OK
// En caso de error: 1|DESCRIPCION_DE_ERROR
func (sf *SystemFacade) AddToCart(aCartID int, anItem string, aQuantity int) error {
	aCartSession, err := sf.CartWithID(aCartID)
	if err != nil {
		return err
	}

	err = aCartSession.AddToCart(anItem, aQuantity)
	if err != nil {
		return err
	}
	return nil
}

// ListCart
// Recurso: /listCart
// Parámetros:
// cartId: Id del carrito creado con /createCart
// Output:
// En caso de éxito: 0|ISBN_1|QUANTITY_1|ISBN_2|QUANTITY_2|....|ISBN_N|QUANTITY_N
// En caso de error: 1|DESCRIPCION_DE_ERROR
func (sf *SystemFacade) ListCart(aCartID int) (map[string]int, error) {
	aCartSession, err := sf.CartWithID(aCartID)
	if err != nil {
		return nil, err
	}
	aMapOfItemsAndQuantities := aCartSession.ListCart()
	return aMapOfItemsAndQuantities, nil
}

// CheckOutCart
// Recurso: /checkOutCart
// Parámetros:
// cartId: Id del carrito creado con /createCart
// ccn: Número de tarjeta de credito
// cced: Fecha de expiración con 2 digitos para el mes y 4 para el año
// cco: Nombre del dueño de la tarjeta.
// Output:
// En caso de éxito: 0|TRANSACTION_ID
// En caso de error: 1|DESCRIPCION_DE_ERROR
func (sf *SystemFacade) CheckOutCart(aCartID int, aCreditCartNumber string, anExpirationDate time.Time, aCreditCardOwner string) error {
	aCartSession, err := sf.CartWithID(aCartID)
	if err != nil {
		return err
	}
	aCreditCard := creditCard.NewCreditCardExpiringOn(anExpirationDate)
	err = aCartSession.CheckOutCartWith(aCreditCard, sf.merchantProcessor, sf.salesBook)
	if err != nil {
		return err
	}
	return nil
}

// ListPurchasesOf
// Recurso: /listPurchases
// Parámetros:
// clientId: ID del cliente que quiere ver que compras hizo
// password: Password del cliente que valida que puede operar con TusLibros.com
// Output:
// En caso de éxito: 0|ISBN_1|QUANTITY_1|....|ISBN_N|QUANTITY_N|TOTAL_AMOUNT
// En caso de error: 1|DESCRIPCION_DE_ERROR
func (sf *SystemFacade) ListPurchasesOf(aUsername string, aPassword string) (map[string]int, error) {
	if !sf.userAuthSystem.RegisteredUser(aUsername, aPassword) {
		return nil, errors.New(InvalidUserOrPasswordErrorMessage)
	}

	userPurchases := sf.salesBook.SalesWithUsername(aUsername)
	return userPurchases, nil
}

// Private

func (sf *SystemFacade) CartWithID(aCartID int) (*cartSession.CartSession, error) {
	if _, ok := sf.cartSessions[aCartID]; !ok {
		return nil, errors.New(InvalidCartIDErrorMessage)
	}

	aCartSession := sf.cartSessions[aCartID]
	if aCartSession.IsExpired() {
		return nil, errors.New(InvalidCartIDErrorMessage)
	}

	return aCartSession, nil
}

func (sf *SystemFacade) generateCartID() int {
	return len(sf.cartSessions) + 1
}
