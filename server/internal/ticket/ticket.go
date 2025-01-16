package ticket

import "github.com/KerbsOD/TusLibros/internal/lineItem"

type Ticket struct {
	lineItems []lineItem.LineItem
}

func NewTicket(anArrayOfLineItems []lineItem.LineItem) Ticket {
	return Ticket{lineItems: anArrayOfLineItems}
}

func (t *Ticket) Total() int {
	sum := 0
	for _, line := range t.lineItems {
		sum += line.Total()
	}
	return sum
}

func (t *Ticket) AddLineItemsAndItsQuantityToMapCollector(aListOfPurchases *map[string]int) {
	for _, aLineItem := range t.lineItems {
		aLineItem.AddToPurchaseMap(aListOfPurchases)
	}
}
