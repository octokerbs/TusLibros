package ticket

import "github.com/KerbsOD/TusLibros/internal/lineItem"

type Ticket struct {
	lineItems []lineItem.LineItem
}

func NewTicket(anArrayOfLineItems []lineItem.LineItem) Ticket {
	return Ticket{lineItems: anArrayOfLineItems}
}

func (t *Ticket) Total() float64 {
	sum := 0.0
	for _, line := range t.lineItems {
		sum += line.Total()
	}
	return sum
}

func (t *Ticket) AddLineItemsAndItsCostToMapCollector(aListOfPurchases *map[string]float64) {
	for _, aLineItem := range t.lineItems {
		aLineItem.AddToPurchaseMap(aListOfPurchases)
	}
}
