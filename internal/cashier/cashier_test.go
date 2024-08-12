package cashier

import (
	"github.com/KerbsOD/TusLibros/internal/cart"
	"github.com/KerbsOD/TusLibros/internal/merchantProcessor"
	"github.com/KerbsOD/TusLibros/internal/salesBook"
	"github.com/KerbsOD/TusLibros/internal/testsObjectFactory"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
	"testing"
)

type CashierTestSuite struct {
	suite.Suite
	factory testsObjectFactory.TestsObjectFactory
}

func TestCashierTestSuite(t *testing.T) {
	suite.Run(t, new(CashierTestSuite))
}

func (s *CashierTestSuite) Test01CanNotCheckoutEmptyCart() {
	emptyCart := cart.NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	assert.PanicsWithError(s.T(), InvalidCart, func() {
		NewCashier(
			emptyCart,
			s.factory.ValidCreditCard(),
			s.factory.MockMerchantProcessor(),
			s.factory.Today(),
			salesBook.NewSalesBook())
	})
}

func (s *CashierTestSuite) Test02CheckoutTotalIsCalculatedCorrectly() {
	validCart := cart.NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	validCart.AddToCart(s.factory.ItemInCatalog(), 3)
	cashier := NewCashier(
		validCart,
		s.factory.ValidCreditCard(),
		s.factory.MockMerchantProcessor(),
		s.factory.Today(),
		salesBook.NewSalesBook())
	assert.Equal(s.T(), s.factory.ItemInCatalogPrice()*3, cashier.Checkout())
}

func (s *CashierTestSuite) Test03CantCheckoutWithAnExpiredCreditCard() {
	validCart := cart.NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	validCart.AddToCart(s.factory.ItemInCatalog(), 3)
	assert.PanicsWithError(s.T(), merchantProcessor.InvalidCreditCard, func() {
		NewCashier(
			validCart,
			s.factory.ExpiredCreditCard(),
			s.factory.MockMerchantProcessor(),
			s.factory.Today(),
			salesBook.NewSalesBook())
	})
}

func (s *CashierTestSuite) Test04SalesAreRegisteredOnSalesBook() {
	validCart := cart.NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	validCart.AddToCart(s.factory.ItemInCatalog(), 3)
	sales := salesBook.NewSalesBook()
	cashier := NewCashier(
		validCart,
		s.factory.ValidCreditCard(),
		s.factory.MockMerchantProcessor(),
		s.factory.Today(),
		sales)
	cashier.Checkout()
	assert.False(s.T(), sales.IsEmpty())
	assert.Equal(s.T(), s.factory.ItemInCatalogPrice()*3, sales.LastSale().Total())
}

func (s *CashierTestSuite) Test05CashierChargesCreditCardUsingMerchantProcessor() {
	validCart := cart.NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	creditCard := s.factory.ValidCreditCard()
	mockMerchantProcessor := s.factory.MockMerchantProcessor()
	validCart.AddToCart(s.factory.ItemInCatalog(), 3)
	cashier := NewCashier(
		validCart,
		creditCard,
		mockMerchantProcessor,
		s.factory.Today(),
		salesBook.NewSalesBook())
	cashier.Checkout()
	assert.Equal(s.T(), creditCard, mockMerchantProcessor.UsedCard())
	assert.Equal(s.T(), s.factory.ItemInCatalogPrice()*3, mockMerchantProcessor.DebitedAmount())
}

func (s *CashierTestSuite) Test06CanNotCheckOutIfCreditCardHasInsufficientFunds() {
	validCart := cart.NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	creditCard := s.factory.ValidCreditCard()
	mockMerchantProcessor := s.factory.MockMerchantProcessor()
	sales := salesBook.NewSalesBook()
	validCart.AddToCart(s.factory.ItemInCatalog(), 3)
	mockMerchantProcessor.ActivateInsufficientFundsMode()
	cashier := NewCashier(
		validCart,
		creditCard,
		mockMerchantProcessor,
		s.factory.Today(),
		sales)
	assert.PanicsWithError(s.T(), merchantProcessor.InvalidCreditCard, func() {
		cashier.Checkout()
	})
	assert.True(s.T(), sales.IsEmpty())
}
