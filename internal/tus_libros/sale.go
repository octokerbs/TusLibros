package tus_libros

type Sale struct {
	ticket Ticket
	owner  *UserCredentials
}

func NewSale(aTicket Ticket, aUser *UserCredentials) Sale {
	return Sale{ticket: aTicket, owner: aUser}
}

func (s *Sale) AddToPurchasesIfOwnerIs(aUser *UserCredentials, aListOfPurchases *map[string]int) {
	if aUser == s.owner {
		s.ticket.AddLineItemsAndItsCostToMapCollector(aListOfPurchases)
	}
}
