package tests

import (
	"github.com/KerbsOD/TusLibros/internal/app"
	"github.com/KerbsOD/TusLibros/internal/errorMessages"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
	"testing"
)

type CartTestSuite struct {
	suite.Suite
	factory TestsObjectFactory
}

func TestCartTestSuite(t *testing.T) {
	suite.Run(t, new(CartTestSuite))
}

func (s *CartTestSuite) Test01NewCartsAreEmpty() {
	cart := app.NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	assert.True(s.T(), cart.IsEmpty())
}

func (s *CartTestSuite) Test02CanNotAddItemsThatDontBelongToTheStore() {
	cart := app.NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	err := cart.AddToCart(s.factory.ItemNotInCatalog(), 1)
	assert.EqualError(s.T(), err, errorMessages.InvalidItemErrorMessage)
	assert.True(s.T(), cart.IsEmpty())
}

func (s *CartTestSuite) Test03CartIsNotEmptyAfterAddingAnItem() {
	cart := app.NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	_ = cart.AddToCart(s.factory.ItemInCatalog(), 1)
	assert.False(s.T(), cart.IsEmpty())
}

func (s *CartTestSuite) Test04CanNotAddNegativeNumberOfItems() {
	cart := app.NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	err := cart.AddToCart(s.factory.ItemInCatalog(), -1)
	assert.EqualError(s.T(), err, errorMessages.InvalidQuantityErrorMessage)
	assert.True(s.T(), cart.IsEmpty())
}

func (s *CartTestSuite) Test05CartRemembersAddedItems() {
	cart := app.NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	_ = cart.AddToCart(s.factory.ItemInCatalog(), 1)
	items, _ := cart.ListCart()
	assert.Equal(s.T(), items, map[string]int{s.factory.ItemInCatalog(): 1})
	assert.False(s.T(), cart.IsEmpty())
}

func (s *CartTestSuite) Test06CartRemembersTheNumberOfAddedItems() {
	cart := app.NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	_ = cart.AddToCart(s.factory.ItemInCatalog(), 1)
	_ = cart.AddToCart(s.factory.ItemInCatalog(), 1)
	items, _ := cart.ListCart()
	assert.Equal(s.T(), items, map[string]int{s.factory.ItemInCatalog(): 2})
	assert.False(s.T(), cart.IsEmpty())
}
