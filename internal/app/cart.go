package app

import (
	"errors"
	"github.com/KerbsOD/TusLibros/internal/errorMessages"
)

type Cart struct {
	catalog  map[string]int
	contents map[string]int
}

func NewCart(aCatalog map[string]int) *Cart {
	return &Cart{catalog: aCatalog, contents: make(map[string]int)}
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

func (c *Cart) ListCart() (map[string]int, error) {
	if len(c.contents) == 0 {
		return nil, errors.New(errorMessages.InvalidCart)
	}
	return c.contents, nil
}

func (c *Cart) IsEmpty() bool {
	return len(c.contents) == 0
}

func (c *Cart) AddLineItemsTo(aListOfLineItems *[]LineItem) {
	for item, quantity := range c.contents {
		lineCost := c.catalog[item] * quantity
		*aListOfLineItems = append(*aListOfLineItems, NewLineItem(item, lineCost))
	}
}

func (c *Cart) assertValidQuantity(aQuantity int) error {
	if aQuantity < 1 {
		return errors.New(errorMessages.InvalidQuantityErrorMessage)
	}
	return nil
}

func (c *Cart) assertValidItem(anItem string) error {
	if _, ok := c.catalog[anItem]; !ok {
		return errors.New(errorMessages.InvalidItemErrorMessage)
	}
	return nil
}

func (c *Cart) defineItemIfNotInContents(anItem string) {
	if _, ok := c.contents[anItem]; !ok {
		c.contents[anItem] = 0
	}
}
