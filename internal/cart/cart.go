package cart

import (
	"errors"

	"github.com/KerbsOD/TusLibros/internal/book"
	"github.com/KerbsOD/TusLibros/internal/lineItem"
)

type Cart struct {
	catalog  map[string]book.Book
	contents map[string]int
}

func NewCart(aCatalog map[string]book.Book) *Cart {
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
		return nil, errors.New(InvalidCartErrorMessage)
	}
	return c.contents, nil
}

func (c *Cart) IsEmpty() bool {
	return len(c.contents) == 0
}

func (c *Cart) AddLineItemsTo(aListOfLineItems *[]lineItem.LineItem) {
	for item, quantity := range c.contents {
		lineCost := c.catalog[item].CalculatePrice(quantity)
		*aListOfLineItems = append(*aListOfLineItems, lineItem.NewLineItem(item, lineCost))
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
