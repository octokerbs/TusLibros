package cashier

import (
	"errors"
	"github.com/KerbsOD/TusLibros/internal/cart"
	"github.com/KerbsOD/TusLibros/internal/lineItem"
	"github.com/KerbsOD/TusLibros/internal/sale"
	"github.com/KerbsOD/TusLibros/internal/salesBook"
	"github.com/KerbsOD/TusLibros/internal/testsObjects/mocks/merchantProcessor"
	"github.com/KerbsOD/TusLibros/internal/testsObjects/testsObjectFactory"
	"github.com/KerbsOD/TusLibros/internal/ticket"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"
	"testing"
)

type CashierTestSuite struct {
	suite.Suite
	factory               testsObjectFactory.TestsObjectFactory
	mockMerchantProcessor *merchantProcessor.MockMerchantProcessor
}

func TestCashierTestSuite(t *testing.T) {
	suite.Run(t, new(CashierTestSuite))
}

func (s *CashierTestSuite) SetupTest() {
	s.mockMerchantProcessor = merchantProcessor.NewMockMerchantProcessor()
}

func (s *CashierTestSuite) Test01CanNotCheckoutEmptyCart() {
	emptyCart := cart.NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	_, err := NewCashier(
		emptyCart,
		s.factory.ValidUserCredentials(),
		s.factory.ValidCreditCard(),
		s.mockMerchantProcessor,
		s.factory.Today(),
		salesBook.NewSalesBook())

	assert.EqualError(s.T(), err, InvalidCart)
}

func (s *CashierTestSuite) Test02CheckoutTotalIsCalculatedCorrectly() {
	validCart := cart.NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	_ = validCart.AddToCart(s.factory.ItemInCatalog(), 3)

	cashier, _ := NewCashier(
		validCart,
		s.factory.ValidUserCredentials(),
		s.factory.ValidCreditCard(),
		s.mockMerchantProcessor,
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
		s.factory.ValidUserCredentials(),
		s.factory.ExpiredCreditCard(),
		s.mockMerchantProcessor,
		s.factory.Today(),
		salesBook.NewSalesBook())

	assert.EqualError(s.T(), err, merchantProcessor.InvalidCreditCard)
}

func (s *CashierTestSuite) Test04SalesAreRegisteredOnSalesBook() {
	validCart := cart.NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	_ = validCart.AddToCart(s.factory.ItemInCatalog(), 3)
	currentSalesBook := salesBook.NewSalesBook()
	cashier, _ := NewCashier(
		validCart,
		s.factory.ValidUserCredentials(),
		s.factory.ValidCreditCard(),
		s.mockMerchantProcessor,
		s.factory.Today(),
		currentSalesBook)
	_, _ = cashier.Checkout()

	expectedSalesBook := salesBook.NewSalesBook()
	aLineItem := lineItem.NewLineItem(s.factory.ItemInCatalog(), s.factory.ItemInCatalogPrice()*3)
	aTicket := ticket.NewTicket([]lineItem.LineItem{aLineItem})
	aSale := sale.NewSale(aTicket, s.factory.ValidUserCredentials())
	expectedSalesBook.AddSale(aSale)

	assert.Equal(s.T(), expectedSalesBook, currentSalesBook)
}

func (s *CashierTestSuite) Test05CashierChargesCreditCardUsingMerchantProcessor() {
	validCart := cart.NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	creditCard := s.factory.ValidCreditCard()
	_ = validCart.AddToCart(s.factory.ItemInCatalog(), 3)
	cashier, _ := NewCashier(
		validCart,
		s.factory.ValidUserCredentials(),
		creditCard,
		s.mockMerchantProcessor,
		s.factory.Today(),
		salesBook.NewSalesBook())

	_, _ = cashier.Checkout()
	assert.Equal(s.T(), creditCard, s.mockMerchantProcessor.UsedCard())
	assert.Equal(s.T(), s.factory.ItemInCatalogPrice()*3, s.mockMerchantProcessor.DebitedAmount())
}

func (s *CashierTestSuite) Test06CanNotCheckOutIfCreditCardHasInsufficientFunds() {
	validCart := cart.NewCart(s.factory.CatalogWithAnItemAndItsPrice())
	creditCard := s.factory.ValidCreditCard()
	sales := salesBook.NewSalesBook()
	_ = validCart.AddToCart(s.factory.ItemInCatalog(), 3)

	s.mockMerchantProcessor.On("DebitOn", mock.Anything, mock.Anything).Return(errors.New(merchantProcessor.InvalidCreditCard))

	cashier, _ := NewCashier(
		validCart,
		s.factory.ValidUserCredentials(),
		creditCard,
		s.mockMerchantProcessor,
		s.factory.Today(),
		sales)

	_, err := cashier.Checkout()
	assert.EqualError(s.T(), err, merchantProcessor.InvalidCreditCard)
	assert.True(s.T(), sales.IsEmpty())
}
