package salesBook

type Ticket struct {
	lineItems []LineItem
}

func NewTicket(anArrayOfLineItems []LineItem) Ticket {
	t := new(Ticket)
	t.lineItems = anArrayOfLineItems
	return *t
}

func (t *Ticket) Total() int {
	sum := 0
	for _, line := range t.lineItems {
		sum += line.Total()
	}
	return sum
}

func (t *Ticket) AddLineItemsAndItsCostToMapCollector(aListOfPurchases *map[string]int) {
	for _, aLineItem := range t.lineItems {
		aLineItem.AddToPurchaseMap(aListOfPurchases)
	}
}
