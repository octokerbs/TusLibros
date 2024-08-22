package tus_libros

type SalesBook struct {
	sales []Sale
}

func NewSalesBook() *SalesBook {
	return &SalesBook{sales: make([]Sale, 0)}
}

func (sb *SalesBook) AddSale(sale Sale) {
	sb.sales = append(sb.sales, sale)
}

func (sb *SalesBook) IsEmpty() bool {
	return len(sb.sales) == 0
}

func (sb *SalesBook) SalesWhereOwnerIs(aUser *UserCredentials) map[string]int {
	userPurchases := map[string]int{}

	for _, aSale := range sb.sales {
		aSale.AddToPurchasesIfOwnerIs(aUser, &userPurchases)
	}

	return userPurchases
}
