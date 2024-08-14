package cashier

import (
	"errors"
	"github.com/KerbsOD/TusLibros/internal/cart"
	"github.com/KerbsOD/TusLibros/internal/creditCard"
	"github.com/KerbsOD/TusLibros/internal/salesBook"
	merchantProcessor2 "github.com/KerbsOD/TusLibros/internal/testsObjects/mocks/merchantProcessor"
	"time"
)

type Cashier struct {
	cart              *cart.Cart
	owner             string
	card              *creditCard.CreditCard
	merchantProcessor merchantProcessor2.MerchantProcessor
	salesBook         *salesBook.SalesBook
	ticket            salesBook.Ticket
}

func NewCashier(aCart *cart.Cart, aCartOwner string, aCreditCard *creditCard.CreditCard, aMerchantProcessor merchantProcessor2.MerchantProcessor, aDate time.Time, aSalesBook *salesBook.SalesBook) (*Cashier, error) {
	if err := assertValidCart(aCart); err != nil {
		return nil, err
	}

	if err := assertValidCreditCard(aCreditCard, aDate); err != nil {
		return nil, err
	}

	c := new(Cashier)
	c.cart = aCart
	c.owner = aCartOwner
	c.card = aCreditCard
	c.merchantProcessor = aMerchantProcessor
	c.salesBook = aSalesBook
	return c, nil
}

func (c *Cashier) Checkout() (int, error) {
	c.createTicket()
	if err := c.debitTotal(); err != nil {
		return -1, err
	}
	c.registerSale()

	return c.total(), nil
}

func (c *Cashier) createTicket() {
	lineItems := []salesBook.LineItem{}
	c.cart.AddLineItemsTo(&lineItems)
	c.ticket = salesBook.NewTicket(lineItems)
}

func (c *Cashier) debitTotal() error {
	if err := c.merchantProcessor.DebitOn(c.total(), c.card); err != nil {
		return err
	}
	return nil
}

func (c *Cashier) registerSale() {
	newSale := salesBook.NewSale(c.ticket, c.owner)
	c.salesBook.AddSale(newSale)
}

func (c *Cashier) total() int {
	return c.ticket.Total()
}

func assertValidCreditCard(aCreditCard *creditCard.CreditCard, aTodaysDate time.Time) error {
	if aCreditCard.IsExpiredOn(aTodaysDate) {
		return errors.New(merchantProcessor2.InvalidCreditCard)
	}
	return nil
}

func assertValidCart(aCart *cart.Cart) error {
	if aCart.IsEmpty() {
		return errors.New(InvalidCart)
	}
	return nil
}
