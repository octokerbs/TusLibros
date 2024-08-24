package sale

import (
	"github.com/KerbsOD/TusLibros/internal/ticket"
	"github.com/KerbsOD/TusLibros/internal/userCredentials"
)

type Sale struct {
	ticket ticket.Ticket
	owner  *userCredentials.UserCredentials
}

func NewSale(aTicket ticket.Ticket, aUser *userCredentials.UserCredentials) Sale {
	return Sale{ticket: aTicket, owner: aUser}
}

func (s *Sale) AddToPurchasesIfOwnerIs(aUser *userCredentials.UserCredentials, aListOfPurchases *map[string]float64) {
	if aUser.SameCredentialsAs(s.owner) {
		s.ticket.AddLineItemsAndItsCostToMapCollector(aListOfPurchases)
	}
}
