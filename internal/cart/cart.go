package cart

import (
	"errors"
	"github.com/KerbsOD/TusLibros/internal/salesBook"
)

type Cart struct {
	catalog  map[string]int
	contents map[string]int
}

func NewCart(aCatalog map[string]int) *Cart {
	c := new(Cart)
	c.catalog = aCatalog
	c.contents = make(map[string]int)
	return c
}

func (c *Cart) AddToCart(anItem string, aQuantity int) error {
	if err := c.assertValidItem(anItem); err != nil {
		return err
	}

	if err := c.assertValidQuantity(aQuantity); err != nil {
		return err
	}

	c.defineItemIfNotInContents(anItem)
	c.contents[anItem] += aQuantity
	return nil
}

func (c *Cart) ListCart() map[string]int {
	return c.contents
}

func (c *Cart) IsEmpty() bool {
	return len(c.contents) == 0
}

func (c *Cart) AddLineItemsTo(aListOfLineItems *[]salesBook.LineItem) {
	for item, quantity := range c.contents {
		lineCost := c.catalog[item] * quantity
		*aListOfLineItems = append(*aListOfLineItems, salesBook.NewLineItem(item, lineCost))
	}
}

func (c *Cart) assertValidQuantity(aQuantity int) error {
	if aQuantity < 1 {
		return errors.New(InvalidQuantityErrorMessage)
	}
	return nil
}

func (c *Cart) assertValidItem(anItem string) error {
	if _, ok := c.catalog[anItem]; !ok {
		return errors.New(InvalidItemErrorMessage)
	}
	return nil
}

func (c *Cart) defineItemIfNotInContents(anItem string) {
	if _, ok := c.contents[anItem]; !ok {
		c.contents[anItem] = 0
	}
}
