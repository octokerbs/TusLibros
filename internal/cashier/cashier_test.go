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
	_, err := NewCashier(
		emptyCart,
		s.factory.ValidCreditCard(),
		s.factory.NewMockMerchantProcessor(),
		s.factory.Today(),
		salesBook.NewSalesBook())

	assert.EqualError(s.T(), err, InvalidCart)
}

func (s *CashierTestSuite) Test02CheckoutTotalIsCalculatedCorrectly() {
	validCart := cart.NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	_ = validCart.AddToCart(s.factory.ItemInCatalog(), 3)
	cashier, _ := NewCashier(
		validCart,
		s.factory.ValidCreditCard(),
		s.factory.NewMockMerchantProcessor(),
		s.factory.Today(),
		salesBook.NewSalesBook())
	checkoutTotal, _ := cashier.Checkout()
	assert.Equal(s.T(), s.factory.ItemInCatalogPrice()*3, checkoutTotal)
}

func (s *CashierTestSuite) Test03CantCheckoutWithAnExpiredCreditCard() {
	validCart := cart.NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	_ = validCart.AddToCart(s.factory.ItemInCatalog(), 3)
	_, err := NewCashier(
		validCart,
		s.factory.ExpiredCreditCard(),
		s.factory.NewMockMerchantProcessor(),
		s.factory.Today(),
		salesBook.NewSalesBook())

	assert.EqualError(s.T(), err, merchantProcessor.InvalidCreditCard)
}

func (s *CashierTestSuite) Test04SalesAreRegisteredOnSalesBook() {
	validCart := cart.NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	_ = validCart.AddToCart(s.factory.ItemInCatalog(), 3)
	sales := salesBook.NewSalesBook()
	cashier, _ := NewCashier(
		validCart,
		s.factory.ValidCreditCard(),
		s.factory.NewMockMerchantProcessor(),
		s.factory.Today(),
		sales)
	_, _ = cashier.Checkout()
	assert.False(s.T(), sales.IsEmpty())
	assert.Equal(s.T(), s.factory.ItemInCatalogPrice()*3, sales.LastSale().Total())
}

func (s *CashierTestSuite) Test05CashierChargesCreditCardUsingMerchantProcessor() {
	validCart := cart.NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	creditCard := s.factory.ValidCreditCard()
	mockMerchantProcessor := s.factory.NewMockMerchantProcessor()
	_ = validCart.AddToCart(s.factory.ItemInCatalog(), 3)
	cashier, _ := NewCashier(
		validCart,
		creditCard,
		mockMerchantProcessor,
		s.factory.Today(),
		salesBook.NewSalesBook())
	_, _ = cashier.Checkout()
	assert.Equal(s.T(), creditCard, mockMerchantProcessor.UsedCard())
	assert.Equal(s.T(), s.factory.ItemInCatalogPrice()*3, mockMerchantProcessor.DebitedAmount())
}

func (s *CashierTestSuite) Test06CanNotCheckOutIfCreditCardHasInsufficientFunds() {
	validCart := cart.NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	creditCard := s.factory.ValidCreditCard()
	mockMerchantProcessor := s.factory.NewMockMerchantProcessor()
	sales := salesBook.NewSalesBook()
	_ = validCart.AddToCart(s.factory.ItemInCatalog(), 3)
	mockMerchantProcessor.ActivateInsufficientFundsMode()
	cashier, _ := NewCashier(
		validCart,
		creditCard,
		mockMerchantProcessor,
		s.factory.Today(),
		sales)

	_, err := cashier.Checkout()
	assert.EqualError(s.T(), err, merchantProcessor.InvalidCreditCard)
	assert.True(s.T(), sales.IsEmpty())
}
