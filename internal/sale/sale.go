package sale

import (
	ticket2 "github.com/KerbsOD/TusLibros/internal/ticket"
	"github.com/KerbsOD/TusLibros/internal/userCredentials"
)

type Sale struct {
	ticket ticket2.Ticket
	owner  *userCredentials.UserCredentials
}

func NewSale(aTicket ticket2.Ticket, aUser *userCredentials.UserCredentials) Sale {
	return Sale{ticket: aTicket, owner: aUser}
}

func (s *Sale) AddToPurchasesIfOwnerIs(aUser *userCredentials.UserCredentials, aListOfPurchases *map[string]int) {
	if aUser == s.owner {
		s.ticket.AddLineItemsAndItsCostToMapCollector(aListOfPurchases)
	}
}
