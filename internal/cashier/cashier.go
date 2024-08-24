package cashier

import (
	"errors"
	"github.com/KerbsOD/TusLibros/internal/cart"
	"github.com/KerbsOD/TusLibros/internal/creditCard"
	"github.com/KerbsOD/TusLibros/internal/lineItem"
	"github.com/KerbsOD/TusLibros/internal/merchantProcessor"
	"github.com/KerbsOD/TusLibros/internal/sale"
	"github.com/KerbsOD/TusLibros/internal/salesBook"
	"github.com/KerbsOD/TusLibros/internal/ticket"
	"github.com/KerbsOD/TusLibros/internal/userCredentials"
	"time"
)

type Cashier struct {
	cart              *cart.Cart
	owner             *userCredentials.UserCredentials
	card              *creditCard.CreditCard
	merchantProcessor merchantProcessor.MerchantProcessor
	salesBook         *salesBook.SalesBook
	ticket            ticket.Ticket
}

func NewCashier(
	aCart *cart.Cart,
	aUser *userCredentials.UserCredentials,
	aCreditCard *creditCard.CreditCard,
	aMerchantProcessor merchantProcessor.MerchantProcessor,
	aDate time.Time,
	aSalesBook *salesBook.SalesBook,
) (*Cashier, error) {
	if err := assertValidCart(aCart); err != nil {
		return nil, err
	}

	if err := assertValidCreditCard(aCreditCard, aDate); err != nil {
		return nil, err
	}

	return &Cashier{cart: aCart, owner: aUser, card: aCreditCard, merchantProcessor: aMerchantProcessor, salesBook: aSalesBook}, nil
}

func (c *Cashier) Checkout() (int, error) {
	c.createTicket()
	if err := c.debitTotal(); err != nil {
		return -1, err
	}
	c.registerSale()

	return c.salesBook.LastTransactionID(), nil
}

func (c *Cashier) createTicket() {
	lineItems := make([]lineItem.LineItem, 0)
	c.cart.AddLineItemsTo(&lineItems)
	c.ticket = ticket.NewTicket(lineItems)
}

func (c *Cashier) debitTotal() error {
	if err := c.merchantProcessor.DebitOn(c.Total(), c.card); err != nil {
		return err
	}
	return nil
}

func (c *Cashier) registerSale() {
	newSale := sale.NewSale(c.ticket, c.owner)
	c.salesBook.AddSale(newSale)
}

func (c *Cashier) Total() float64 {
	return c.ticket.Total()
}

func assertValidCreditCard(aCreditCard *creditCard.CreditCard, aDate time.Time) error {
	if aCreditCard.IsExpiredOn(aDate) {
		return errors.New(merchantProcessor.InvalidCreditCardErrorMessage)
	}
	return nil
}

func assertValidCart(aCart *cart.Cart) error {
	if aCart.IsEmpty() {
		return errors.New(InvalidCartErrorMessage)
	}
	return nil
}
