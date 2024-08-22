package tus_libros

import (
	"errors"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"
	"testing"
)

type CashierTestSuite struct {
	suite.Suite
	factory               TestsObjectFactory
	mockMerchantProcessor *MockMerchantProcessor
}

func TestCashierTestSuite(t *testing.T) {
	suite.Run(t, new(CashierTestSuite))
}

func (s *CashierTestSuite) SetupTest() {
	s.mockMerchantProcessor = NewMockMerchantProcessor()
}

func (s *CashierTestSuite) Test01CanNotCheckoutEmptyCart() {
	emptyCart := NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	_, err := NewCashier(
		emptyCart,
		s.factory.ValidUserCredentials(),
		s.factory.ValidCreditCard(),
		s.mockMerchantProcessor,
		s.factory.Today(),
		NewSalesBook())

	assert.EqualError(s.T(), err, InvalidCart)
}

func (s *CashierTestSuite) Test02CheckoutTotalIsCalculatedCorrectly() {
	validCart := NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	_ = validCart.AddToCart(s.factory.ItemInCatalog(), 3)

	cashier, _ := NewCashier(
		validCart,
		s.factory.ValidUserCredentials(),
		s.factory.ValidCreditCard(),
		s.mockMerchantProcessor,
		s.factory.Today(),
		NewSalesBook())

	checkoutTotal, _ := cashier.Checkout()
	assert.Equal(s.T(), s.factory.ItemInCatalogPrice()*3, checkoutTotal)
}

func (s *CashierTestSuite) Test03CantCheckoutWithAnExpiredCreditCard() {
	validCart := NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	_ = validCart.AddToCart(s.factory.ItemInCatalog(), 3)
	_, err := NewCashier(
		validCart,
		s.factory.ValidUserCredentials(),
		s.factory.ExpiredCreditCard(),
		s.mockMerchantProcessor,
		s.factory.Today(),
		NewSalesBook())

	assert.EqualError(s.T(), err, InvalidCreditCard)
}

func (s *CashierTestSuite) Test04SalesAreRegisteredOnSalesBook() {
	validCart := NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	_ = validCart.AddToCart(s.factory.ItemInCatalog(), 3)
	currentSalesBook := NewSalesBook()
	cashier, _ := NewCashier(
		validCart,
		s.factory.ValidUserCredentials(),
		s.factory.ValidCreditCard(),
		s.mockMerchantProcessor,
		s.factory.Today(),
		currentSalesBook)
	_, _ = cashier.Checkout()

	expectedSalesBook := NewSalesBook()
	aLineItem := NewLineItem(s.factory.ItemInCatalog(), s.factory.ItemInCatalogPrice()*3)
	aTicket := NewTicket([]LineItem{aLineItem})
	aSale := NewSale(aTicket, s.factory.ValidUserCredentials())
	expectedSalesBook.AddSale(aSale)

	assert.Equal(s.T(), expectedSalesBook, currentSalesBook)
}

func (s *CashierTestSuite) Test05CashierChargesCreditCardUsingMerchantProcessor() {
	validCart := NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	creditCard := s.factory.ValidCreditCard()
	_ = validCart.AddToCart(s.factory.ItemInCatalog(), 3)
	cashier, _ := NewCashier(
		validCart,
		s.factory.ValidUserCredentials(),
		creditCard,
		s.mockMerchantProcessor,
		s.factory.Today(),
		NewSalesBook())

	_, _ = cashier.Checkout()
	assert.Equal(s.T(), creditCard, s.mockMerchantProcessor.UsedCard())
	assert.Equal(s.T(), s.factory.ItemInCatalogPrice()*3, s.mockMerchantProcessor.DebitedAmount())
}

func (s *CashierTestSuite) Test06CanNotCheckOutIfCreditCardHasInsufficientFunds() {
	validCart := NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	creditCard := s.factory.ValidCreditCard()
	sales := NewSalesBook()
	_ = validCart.AddToCart(s.factory.ItemInCatalog(), 3)

	s.mockMerchantProcessor.On("DebitOn", mock.Anything, mock.Anything).Return(errors.New(InvalidCreditCard))

	cashier, _ := NewCashier(
		validCart,
		s.factory.ValidUserCredentials(),
		creditCard,
		s.mockMerchantProcessor,
		s.factory.Today(),
		sales)

	_, err := cashier.Checkout()
	assert.EqualError(s.T(), err, InvalidCreditCard)
	assert.True(s.T(), sales.IsEmpty())
}
