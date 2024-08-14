package salesBook

type SalesBook struct {
	sales []Sale
}

func NewSalesBook() *SalesBook {
	sb := new(SalesBook)
	sb.sales = make([]Sale, 0)
	return sb
}

func (sb *SalesBook) AddSale(sale Sale) {
	sb.sales = append(sb.sales, sale)
}

func (sb *SalesBook) IsEmpty() bool {
	return len(sb.sales) == 0
}

func (sb *SalesBook) SalesWithUsername(aUsername string) map[string]int {
	userPurchases := map[string]int{}

	for _, aSale := range sb.sales {
		aSale.AddToPurchasesIfOwnerIs(aUsername, &userPurchases)
	}

	return userPurchases
}
