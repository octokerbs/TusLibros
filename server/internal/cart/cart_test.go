package cart

import (
	"testing"

	"github.com/KerbsOD/TusLibros/internal/testsObjectFactory"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
)

type CartTestSuite struct {
	suite.Suite
	factory testsObjectFactory.TestsObjectFactory
}

func TestCartTestSuite(t *testing.T) {
	suite.Run(t, new(CartTestSuite))
}

func (s *CartTestSuite) Test01NewCartsAreEmpty() {
	cart := NewCart(*s.factory.NewCatalog())
	assert.True(s.T(), cart.IsEmpty())
}

func (s *CartTestSuite) Test02CanNotAddItemsThatDontBelongToTheStore() {
	cart := NewCart(*s.factory.NewCatalog())
	err := cart.AddToCart(s.factory.ItemNotInCatalog().ISBN(), 1)
	assert.EqualError(s.T(), err, InvalidItemErrorMessage)
	assert.True(s.T(), cart.IsEmpty())
}

func (s *CartTestSuite) Test03CartIsNotEmptyAfterAddingAnItem() {
	cart := NewCart(*s.factory.NewCatalog())
	_ = cart.AddToCart(s.factory.ItemInCatalog().ISBN(), 1)
	assert.False(s.T(), cart.IsEmpty())
}

func (s *CartTestSuite) Test04CanNotAddNegativeNumberOfItems() {
	cart := NewCart(*s.factory.NewCatalog())
	err := cart.AddToCart(s.factory.ItemInCatalog().ISBN(), -1)
	assert.EqualError(s.T(), err, InvalidQuantityErrorMessage)
	assert.True(s.T(), cart.IsEmpty())
}

func (s *CartTestSuite) Test05CartRemembersAddedItems() {
	cart := NewCart(*s.factory.NewCatalog())
	_ = cart.AddToCart(s.factory.ItemInCatalog().ISBN(), 1)
	items, _ := cart.ListCart()
	assert.Equal(s.T(), items, map[string]int{s.factory.ItemInCatalog().ISBN(): 1})
	assert.False(s.T(), cart.IsEmpty())
}

func (s *CartTestSuite) Test06CartRemembersTheNumberOfAddedItems() {
	cart := NewCart(*s.factory.NewCatalog())
	_ = cart.AddToCart(s.factory.ItemInCatalog().ISBN(), 1)
	_ = cart.AddToCart(s.factory.ItemInCatalog().ISBN(), 1)
	items, _ := cart.ListCart()
	assert.Equal(s.T(), items, map[string]int{s.factory.ItemInCatalog().ISBN(): 2})
	assert.False(s.T(), cart.IsEmpty())
}
