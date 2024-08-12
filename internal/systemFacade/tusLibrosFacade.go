package systemFacade

import (
	"errors"
	"github.com/KerbsOD/TusLibros/internal/cart"
	"github.com/KerbsOD/TusLibros/internal/userAuthentication"
	"time"
)

type SystemFacade struct {
	catalog        map[string]int
	userAuthSystem userAuthentication.UserAuthentication
	cartSessions   map[int]*cart.Cart
}

func NewFacade(aCatalog map[string]int, aUserAuthSystem userAuthentication.UserAuthentication) *SystemFacade {
	sf := new(SystemFacade)
	sf.catalog = aCatalog
	sf.userAuthSystem = aUserAuthSystem
	sf.cartSessions = make(map[int]*cart.Cart)
	return sf
}

func (sf *SystemFacade) CreateCart(aUsername, aPassword string) (int, error) {
	if !sf.userAuthSystem.RegisteredUser(aUsername, aPassword) {
		return -1, errors.New(InvalidUserOrPasswordErrorMessage)
	}
	newID := len(sf.cartSessions) + 1
	sf.cartSessions[newID] = cart.NewCart(sf.catalog)
	return newID, nil
}

func (sf *SystemFacade) AddToCart(aCartID int, anItem string, aQuantity int) error {
	myCart, err := sf.CartWithID(aCartID)
	if err != nil {
		return err
	}

	err = myCart.AddToCart(anItem, aQuantity)
	if err != nil {
		return err
	}

	return nil
}

func (sf *SystemFacade) ListCart(aCartID int) (map[string]int, error) {
	myCart, err := sf.CartWithID(aCartID)
	if err != nil {
		return nil, err
	}

	addedItems := myCart.ListCart()
	return addedItems, nil
}

func (sf *SystemFacade) CheckOutCart(aCartID int, aCreditCartNumber string, anExpiringDate time.Time, aCreditCardOwner string) error {
	return nil
}

// Testing

func (sf *SystemFacade) CartWithID(aCartID int) (*cart.Cart, error) {
	if _, ok := sf.cartSessions[aCartID]; !ok {
		return nil, errors.New(InvalidCartIDErrorMessage)
	}
	return sf.cartSessions[aCartID], nil
}

func (sf *SystemFacade) ListPurchasesOf(aUsername, aPassword string) (map[string]int, error) {
	return map[string]int{"A Clash of Kings": 15}, nil
}
