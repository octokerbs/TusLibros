package salesBook

import (
	"github.com/KerbsOD/TusLibros/internal/sale"
	"github.com/KerbsOD/TusLibros/internal/userCredentials"
)

type SalesBook struct {
	sales []sale.Sale
}

func NewSalesBook() *SalesBook {
	return &SalesBook{sales: make([]sale.Sale, 0)}
}

func (sb *SalesBook) AddSale(sale sale.Sale) {
	sb.sales = append(sb.sales, sale)
}

func (sb *SalesBook) IsEmpty() bool {
	return len(sb.sales) == 0
}

func (sb *SalesBook) SalesWhereOwnerIs(aUser *userCredentials.UserCredentials) map[string]float64 {
	userPurchases := map[string]float64{}

	for _, aSale := range sb.sales {
		aSale.AddToPurchasesIfOwnerIs(aUser, &userPurchases)
	}

	return userPurchases
}

func (sb *SalesBook) LastTransactionID() int {
	return len(sb.sales)
}
