package tus_libros

import (
	"errors"
	"time"
)

type Cashier struct {
	cart              *Cart
	owner             *UserCredentials
	card              *CreditCard
	merchantProcessor MerchantProcessor
	salesBook         *SalesBook
	ticket            Ticket
}

func NewCashier(
	aCart *Cart,
	aUser *UserCredentials,
	aCreditCard *CreditCard,
	aMerchantProcessor MerchantProcessor,
	aDate time.Time,
	aSalesBook *SalesBook,
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

	return c.total(), nil
}

func (c *Cashier) createTicket() {
	lineItems := make([]LineItem, 0)
	c.cart.AddLineItemsTo(&lineItems)
	c.ticket = NewTicket(lineItems)
}

func (c *Cashier) debitTotal() error {
	if err := c.merchantProcessor.DebitOn(c.total(), c.card); err != nil {
		return err
	}
	return nil
}

func (c *Cashier) registerSale() {
	newSale := NewSale(c.ticket, c.owner)
	c.salesBook.AddSale(newSale)
}

func (c *Cashier) total() int {
	return c.ticket.Total()
}

func assertValidCreditCard(aCreditCard *CreditCard, aDate time.Time) error {
	if aCreditCard.IsExpiredOn(aDate) {
		return errors.New(InvalidCreditCard)
	}
	return nil
}

func assertValidCart(aCart *Cart) error {
	if aCart.IsEmpty() {
		return errors.New(InvalidCart)
	}
	return nil
}
