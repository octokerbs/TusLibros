package app

import (
	"errors"
	"github.com/KerbsOD/TusLibros/internal/errorMessages"
	"time"
)

type SystemFacade struct {
	catalog           map[string]int
	userAuthSystem    UserAuthentication
	merchantProcessor MerchantProcessor
	clock             Clock
	cartSessions      map[int]*CartSession
	salesBook         *SalesBook
}

func NewSystemFacade(
	aCatalog map[string]int,
	anAuthenticationSystem UserAuthentication,
	aMerchantProcessor MerchantProcessor,
	aClock Clock) *SystemFacade {
	return &SystemFacade{
		catalog:           aCatalog,
		userAuthSystem:    anAuthenticationSystem,
		merchantProcessor: aMerchantProcessor,
		clock:             aClock,
		cartSessions:      map[int]*CartSession{},
		salesBook:         NewSalesBook(),
	}
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
func (sf *SystemFacade) CreateCart(aUser *UserCredentials) (int, error) {
	if aUser.ValidCredentials(sf.userAuthSystem) == false {
		return -1, errors.New(errorMessages.InvalidUserOrPasswordErrorMessage)
	}

	aCartID := sf.generateCartID()
	aCartSession := NewCartSession(aUser, NewCart(sf.catalog), sf.clock)
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

	aMapOfItemsAndQuantities, err := aCartSession.ListCart()
	if err != nil {
		return nil, err
	}

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
func (sf *SystemFacade) CheckOutCart(aCartID int, aCreditCartNumber string, anExpirationDate time.Time, aCreditCardOwner string) (int, error) {
	aCartSession, err := sf.CartWithID(aCartID)
	if err != nil {
		return -1, err
	}

	aCreditCard := NewCreditCardExpiringOn(anExpirationDate, aCreditCartNumber)
	transactionID, err := aCartSession.CheckOutCartWith(aCreditCard, sf.merchantProcessor, sf.salesBook)
	if err != nil {
		return -1, err
	}

	return transactionID, nil
}

// ListPurchasesOf
// Recurso: /listPurchases
// Parámetros:
// clientId: ID del cliente que quiere ver que compras hizo
// password: Password del cliente que valida que puede operar con TusLibros.com
// Output:
// En caso de éxito: 0|ISBN_1|QUANTITY_1|....|ISBN_N|QUANTITY_N|TOTAL_AMOUNT
// En caso de error: 1|DESCRIPCION_DE_ERROR
func (sf *SystemFacade) ListPurchasesOf(aUser *UserCredentials) (map[string]int, error) {
	if aUser.ValidCredentials(sf.userAuthSystem) == false {
		return nil, errors.New(errorMessages.InvalidUserOrPasswordErrorMessage)
	}

	userPurchases := sf.salesBook.SalesWhereOwnerIs(aUser)

	return userPurchases, nil
}

// Private

func (sf *SystemFacade) CartWithID(aCartID int) (*CartSession, error) {
	if _, ok := sf.cartSessions[aCartID]; !ok {
		return nil, errors.New(errorMessages.InvalidCartIDErrorMessage)
	}

	aCartSession := sf.cartSessions[aCartID]
	if aCartSession.IsExpired() {
		return nil, errors.New(errorMessages.InvalidCartIDErrorMessage)
	}

	return aCartSession, nil
}

func (sf *SystemFacade) generateCartID() int {
	return len(sf.cartSessions) + 1
}
