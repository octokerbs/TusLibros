package tests

import (
	"errors"
	"github.com/KerbsOD/TusLibros/internal/app"
	"github.com/KerbsOD/TusLibros/internal/errorMessages"
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
	emptyCart := app.NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	_, err := app.NewCashier(
		emptyCart,
		s.factory.ValidUserCredentials(),
		s.factory.ValidCreditCard(),
		s.mockMerchantProcessor,
		s.factory.Today(),
		app.NewSalesBook())

	assert.EqualError(s.T(), err, errorMessages.InvalidCart)
}

func (s *CashierTestSuite) Test02CheckoutTotalIsCalculatedCorrectly() {
	validCart := app.NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	_ = validCart.AddToCart(s.factory.ItemInCatalog(), 3)

	cashier, _ := app.NewCashier(
		validCart,
		s.factory.ValidUserCredentials(),
		s.factory.ValidCreditCard(),
		s.mockMerchantProcessor,
		s.factory.Today(),
		app.NewSalesBook())

	_, _ = cashier.Checkout()
	assert.Equal(s.T(), s.factory.ItemInCatalogPrice()*3, cashier.Total())
}

func (s *CashierTestSuite) Test03CantCheckoutWithAnExpiredCreditCard() {
	validCart := app.NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	_ = validCart.AddToCart(s.factory.ItemInCatalog(), 3)
	_, err := app.NewCashier(
		validCart,
		s.factory.ValidUserCredentials(),
		s.factory.ExpiredCreditCard(),
		s.mockMerchantProcessor,
		s.factory.Today(),
		app.NewSalesBook())

	assert.EqualError(s.T(), err, errorMessages.InvalidCreditCard)
}

func (s *CashierTestSuite) Test04SalesAreRegisteredOnSalesBook() {
	validCart := app.NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	_ = validCart.AddToCart(s.factory.ItemInCatalog(), 3)
	currentSalesBook := app.NewSalesBook()
	cashier, _ := app.NewCashier(
		validCart,
		s.factory.ValidUserCredentials(),
		s.factory.ValidCreditCard(),
		s.mockMerchantProcessor,
		s.factory.Today(),
		currentSalesBook)
	_, _ = cashier.Checkout()

	expectedSalesBook := app.NewSalesBook()
	aLineItem := app.NewLineItem(s.factory.ItemInCatalog(), s.factory.ItemInCatalogPrice()*3)
	aTicket := app.NewTicket([]app.LineItem{aLineItem})
	aSale := app.NewSale(aTicket, s.factory.ValidUserCredentials())
	expectedSalesBook.AddSale(aSale)

	assert.Equal(s.T(), expectedSalesBook, currentSalesBook)
}

func (s *CashierTestSuite) Test05CashierChargesCreditCardUsingMerchantProcessor() {
	validCart := app.NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	creditCard := s.factory.ValidCreditCard()
	_ = validCart.AddToCart(s.factory.ItemInCatalog(), 3)
	cashier, _ := app.NewCashier(
		validCart,
		s.factory.ValidUserCredentials(),
		creditCard,
		s.mockMerchantProcessor,
		s.factory.Today(),
		app.NewSalesBook())

	_, _ = cashier.Checkout()
	assert.Equal(s.T(), creditCard, s.mockMerchantProcessor.UsedCard())
	assert.Equal(s.T(), s.factory.ItemInCatalogPrice()*3, s.mockMerchantProcessor.DebitedAmount())
}

func (s *CashierTestSuite) Test06CanNotCheckOutIfCreditCardHasInsufficientFunds() {
	validCart := app.NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	creditCard := s.factory.ValidCreditCard()
	sales := app.NewSalesBook()
	_ = validCart.AddToCart(s.factory.ItemInCatalog(), 3)

	s.mockMerchantProcessor.On("DebitOn", mock.Anything, mock.Anything).Return(errors.New(errorMessages.InvalidCreditCard))

	cashier, _ := app.NewCashier(
		validCart,
		s.factory.ValidUserCredentials(),
		creditCard,
		s.mockMerchantProcessor,
		s.factory.Today(),
		sales)

	_, err := cashier.Checkout()
	assert.EqualError(s.T(), err, errorMessages.InvalidCreditCard)
	assert.True(s.T(), sales.IsEmpty())
}
