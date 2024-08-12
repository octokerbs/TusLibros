package systemFacade

import (
	"github.com/KerbsOD/TusLibros/internal/cart"
	"github.com/KerbsOD/TusLibros/internal/testsObjectFactory"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
	"testing"
)

type FacadeTestSuite struct {
	suite.Suite
	factory testsObjectFactory.TestsObjectFactory
}

func TestFacadeTestSuite(t *testing.T) {
	suite.Run(t, new(FacadeTestSuite))
}

func (s *FacadeTestSuite) Test01CanCreateCartWithValidUsernameAndValidUsernamePassword() {
	facade := NewFacade(s.factory.CatalogWithAnItemAndItsPrice(), s.factory.NewMockUserAuthenticationWithValidUser())
	cartID, _ := facade.CreateCart(s.factory.ValidUsername(), s.factory.ValidPassword())
	myCart, _ := facade.CartWithID(cartID)
	assert.True(s.T(), myCart.IsEmpty())
}

func (s *FacadeTestSuite) Test02CanNotCreateCartWithInvalidUsername() {
	facade := NewFacade(s.factory.CatalogWithAnItemAndItsPrice(), s.factory.NewMockUserAuthenticationWithValidUser())
	_, err := facade.CreateCart(s.factory.InvalidUsername(), s.factory.ValidPassword())
	assert.EqualError(s.T(), err, InvalidUserOrPasswordErrorMessage)
}

func (s *FacadeTestSuite) Test03CanNotCreateCartWithInvalidUsernamePassword() {
	facade := NewFacade(s.factory.CatalogWithAnItemAndItsPrice(), s.factory.NewMockUserAuthenticationWithValidUser())
	_, err := facade.CreateCart(s.factory.ValidUsername(), s.factory.InvalidPassword())
	assert.EqualError(s.T(), err, InvalidUserOrPasswordErrorMessage)
}

func (s *FacadeTestSuite) Test04CanAddItemsToACreatedCart() {
	facade := NewFacade(s.factory.CatalogWithAnItemAndItsPrice(), s.factory.NewMockUserAuthenticationWithValidUser())
	cartID, _ := facade.CreateCart(s.factory.ValidUsername(), s.factory.ValidPassword())
	_ = facade.AddToCart(cartID, s.factory.ItemInCatalog(), 10)
	myCart, _ := facade.CartWithID(cartID)
	assert.False(s.T(), myCart.IsEmpty())
}

func (s *FacadeTestSuite) Test05CanNotAddItemToNotCreatedCart() {
	facade := NewFacade(s.factory.CatalogWithAnItemAndItsPrice(), s.factory.NewMockUserAuthenticationWithValidUser())
	err := facade.AddToCart(-1, s.factory.ItemInCatalog(), 10)
	assert.EqualError(s.T(), err, InvalidCartIDErrorMessage)
}

func (s *FacadeTestSuite) Test06CanNotAddItemNotSellByTheStore() {
	facade := NewFacade(s.factory.CatalogWithAnItemAndItsPrice(), s.factory.NewMockUserAuthenticationWithValidUser())
	cartID, _ := facade.CreateCart(s.factory.ValidUsername(), s.factory.ValidPassword())
	err := facade.AddToCart(cartID, s.factory.ItemNotInCatalog(), 10)
	assert.EqualError(s.T(), err, cart.InvalidItemErrorMessage)
}

func (s *FacadeTestSuite) Test07CanNotAddNegativeQuantityOfAnItem() {
	facade := NewFacade(s.factory.CatalogWithAnItemAndItsPrice(), s.factory.NewMockUserAuthenticationWithValidUser())
	cartID, _ := facade.CreateCart(s.factory.ValidUsername(), s.factory.ValidPassword())
	err := facade.AddToCart(cartID, s.factory.ItemInCatalog(), -1)
	assert.EqualError(s.T(), err, cart.InvalidQuantityErrorMessage)
}

func (s *FacadeTestSuite) Test08ListCartOfAnEmptyCartReturnsEmptyMap() {
	facade := NewFacade(s.factory.CatalogWithAnItemAndItsPrice(), s.factory.NewMockUserAuthenticationWithValidUser())
	cartID, _ := facade.CreateCart(s.factory.ValidUsername(), s.factory.ValidPassword())
	addedItems, _ := facade.ListCart(cartID)
	assert.ElementsMatch(s.T(), map[string]int{}, addedItems)
}

func (s *FacadeTestSuite) Test09CanNotListCartWithInvalidCartID() {
	facade := NewFacade(s.factory.CatalogWithAnItemAndItsPrice(), s.factory.NewMockUserAuthenticationWithValidUser())
	_, _ = facade.CreateCart(s.factory.ValidUsername(), s.factory.ValidPassword())
	_, err := facade.ListCart(-1)
	assert.EqualError(s.T(), err, InvalidCartIDErrorMessage)
}

func (s *FacadeTestSuite) Test10ListCartListsAddedItemsCorrectly() {
	facade := NewFacade(s.factory.CatalogWithAnItemAndItsPrice(), s.factory.NewMockUserAuthenticationWithValidUser())
	cartID, _ := facade.CreateCart(s.factory.ValidUsername(), s.factory.ValidPassword())
	_ = facade.AddToCart(cartID, s.factory.ItemInCatalog(), 10)
	addedItems, _ := facade.ListCart(cartID)
	assert.Equal(s.T(), map[string]int{s.factory.ItemInCatalog(): 10}, addedItems)
}

func (s *FacadeTestSuite) Test11CanCheckOutACart() {
	facade := NewFacade(s.factory.CatalogWithAnItemAndItsPrice(), s.factory.NewMockUserAuthenticationWithValidUser())
	cartID, _ := facade.CreateCart(s.factory.ValidUsername(), s.factory.ValidPassword())
	_ = facade.AddToCart(cartID, s.factory.ItemInCatalog(), 10)
	_ = facade.CheckOutCart(cartID, s.factory.ValidCreditCardNumber(), s.factory.Tomorrow(), s.factory.ValidCreditCardOwner())
	clientPurchases, _ := facade.ListPurchasesOf(s.factory.ValidUsername(), s.factory.ValidPassword())
	assert.Equal(s.T(), s.factory.ItemInCatalogPrice(), clientPurchases[s.factory.ItemInCatalog()])
}
