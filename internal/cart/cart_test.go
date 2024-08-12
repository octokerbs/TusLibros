package cart

import (
	"github.com/KerbsOD/TusLibros/internal/testsObjectFactory"
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
	assert.PanicsWithError(s.T(), InvalidItemErrorMessage, func() {
		cart.AddToCart(s.factory.ItemNotInCatalog(), 1)
	})
	assert.True(s.T(), cart.IsEmpty())
}

func (s *CartTestSuite) Test03CartIsNotEmptyAfterAddingAnItem() {
	cart := NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	cart.AddToCart(s.factory.ItemInCatalog(), 1)
	assert.False(s.T(), cart.IsEmpty())
}

func (s *CartTestSuite) Test04CanNotAddNegativeNumberOfItems() {
	cart := NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	assert.PanicsWithError(s.T(), InvalidQuantityErrorMessage, func() {
		cart.AddToCart(s.factory.ItemInCatalog(), -1)
	})
	assert.True(s.T(), cart.IsEmpty())
}

func (s *CartTestSuite) Test05CartRemembersAddedItems() {
	cart := NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	cart.AddToCart(s.factory.ItemInCatalog(), 1)
	assert.Equal(s.T(), cart.ListCart(), map[string]int{s.factory.ItemInCatalog(): 1})
	assert.False(s.T(), cart.IsEmpty())
}

func (s *CartTestSuite) Test06CartRemembersTheNumberOfAddedItems() {
	cart := NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	cart.AddToCart(s.factory.ItemInCatalog(), 1)
	cart.AddToCart(s.factory.ItemInCatalog(), 1)
	assert.Equal(s.T(), cart.ListCart(), map[string]int{s.factory.ItemInCatalog(): 2})
	assert.False(s.T(), cart.IsEmpty())
}
