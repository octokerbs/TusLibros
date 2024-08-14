package salesBook

type Sale struct {
	ticket Ticket
	owner  string
}

func NewSale(aTicket Ticket, anOwner string) Sale {
	s := new(Sale)
	s.ticket = aTicket
	s.owner = anOwner
	return *s
}

func (s *Sale) AddToPurchasesIfOwnerIs(aUsername string, aListOfPurchases *map[string]int) {
	if aUsername == s.owner {
		s.ticket.AddLineItemsAndItsCostToMapCollector(aListOfPurchases)
	}
}
