package cashier

import (
	"errors"
	"github.com/KerbsOD/TusLibros/internal/cart"
	"github.com/KerbsOD/TusLibros/internal/creditCard"
	"github.com/KerbsOD/TusLibros/internal/merchantProcessor"
	"github.com/KerbsOD/TusLibros/internal/salesBook"
	"time"
)

type Cashier struct {
	cart              *cart.Cart
	card              *creditCard.CreditCard
	merchantProcessor merchantProcessor.MerchantProcessor
	salesBook         *salesBook.SalesBook
	total             int
}

func NewCashier(aCart *cart.Cart, aCreditCard *creditCard.CreditCard, aMerchantProcessor merchantProcessor.MerchantProcessor, aTodayDate time.Time, aSalesBook *salesBook.SalesBook) (*Cashier, error) {
	if err := assertValidCart(aCart); err != nil {
		return nil, err
	}

	if err := assertValidCreditCard(aCreditCard, aTodayDate); err != nil {
		return nil, err
	}

	c := new(Cashier)
	c.cart = aCart
	c.card = aCreditCard
	c.merchantProcessor = aMerchantProcessor
	c.salesBook = aSalesBook
	c.total = 0
	return c, nil
}

func (c *Cashier) Checkout() (int, error) {
	c.calculateTotal()
	if err := c.debitTotal(); err != nil {
		return -1, err
	}
	c.registerSale()
	return c.total, nil
}

func (c *Cashier) registerSale() {
	c.salesBook.RegisterSaleOf(c.total)
}

func (c *Cashier) debitTotal() error {
	err := c.merchantProcessor.DebitOn(c.total, c.card)
	if err != nil {
		return err
	}
	return nil
}

func (c *Cashier) calculateTotal() {
	c.total = c.cart.Total()
}

func assertValidCreditCard(aCreditCard *creditCard.CreditCard, aTodaysDate time.Time) error {
	if aCreditCard.IsExpiredOn(aTodaysDate) {
		return errors.New(merchantProcessor.InvalidCreditCard)
	}
	return nil
}

func assertValidCart(aCart *cart.Cart) error {
	if aCart.IsEmpty() {
		return errors.New(InvalidCart)
	}
	return nil
}
