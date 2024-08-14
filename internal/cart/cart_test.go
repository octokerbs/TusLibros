package cart

import (
	"github.com/KerbsOD/TusLibros/internal/testsObjects/testsObjectFactory"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
	"testing"
)

type CartTestSuite struct {
	suite.Suite
	factory testsObjectFactory.TestsObjectFactory
}

func TestCartTestSuite(t *testing.T) {
	suite.Run(t, new(CartTestSuite))
}

func (s *CartTestSuite) Test01NewCartsAreEmpty() {
	cart := NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	assert.True(s.T(), cart.IsEmpty())
}

func (s *CartTestSuite) Test02CanNotAddItemsThatDontBelongToTheStore() {
	cart := NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	err := cart.AddToCart(s.factory.ItemNotInCatalog(), 1)
	assert.EqualError(s.T(), err, InvalidItemErrorMessage)
	assert.True(s.T(), cart.IsEmpty())
}

func (s *CartTestSuite) Test03CartIsNotEmptyAfterAddingAnItem() {
	cart := NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	_ = cart.AddToCart(s.factory.ItemInCatalog(), 1)
	assert.False(s.T(), cart.IsEmpty())
}

func (s *CartTestSuite) Test04CanNotAddNegativeNumberOfItems() {
	cart := NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	err := cart.AddToCart(s.factory.ItemInCatalog(), -1)
	assert.EqualError(s.T(), err, InvalidQuantityErrorMessage)
	assert.True(s.T(), cart.IsEmpty())
}

func (s *CartTestSuite) Test05CartRemembersAddedItems() {
	cart := NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	_ = cart.AddToCart(s.factory.ItemInCatalog(), 1)
	assert.Equal(s.T(), cart.ListCart(), map[string]int{s.factory.ItemInCatalog(): 1})
	assert.False(s.T(), cart.IsEmpty())
}

func (s *CartTestSuite) Test06CartRemembersTheNumberOfAddedItems() {
	cart := NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	_ = cart.AddToCart(s.factory.ItemInCatalog(), 1)
	_ = cart.AddToCart(s.factory.ItemInCatalog(), 1)
	assert.Equal(s.T(), cart.ListCart(), map[string]int{s.factory.ItemInCatalog(): 2})
	assert.False(s.T(), cart.IsEmpty())
}
