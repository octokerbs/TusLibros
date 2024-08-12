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

func NewCashier(aCart *cart.Cart, aCreditCard *creditCard.CreditCard, aMerchantProcessor merchantProcessor.MerchantProcessor, aTodaysDate time.Time, aSalesBook *salesBook.SalesBook) *Cashier {
	assertValidCart(aCart)
	assertValidCreditCard(aCreditCard, aTodaysDate)
	c := new(Cashier)
	c.cart = aCart
	c.card = aCreditCard
	c.merchantProcessor = aMerchantProcessor
	c.salesBook = aSalesBook
	c.total = 0
	return c
}

func (c *Cashier) Checkout() int {
	c.calculateTotal()
	c.debitTotal()
	c.registerSale()
	return c.total
}

func (c *Cashier) registerSale() {
	c.salesBook.RegisterSaleOf(c.total)
}

func (c *Cashier) debitTotal() {
	err := c.merchantProcessor.DebitOn(c.total, c.card)
	if err != nil {
		panic(err)
	}
}

func (c *Cashier) calculateTotal() {
	c.total = c.cart.Total()
}

func assertValidCreditCard(aCreditCard *creditCard.CreditCard, aTodaysDate time.Time) {
	if aCreditCard.IsExpiredOn(aTodaysDate) {
		panic(errors.New(merchantProcessor.InvalidCreditCard))
	}
}

func assertValidCart(aCart *cart.Cart) {
	if aCart.IsEmpty() {
		panic(errors.New(InvalidCart))
	}
}
