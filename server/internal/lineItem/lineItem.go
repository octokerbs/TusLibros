package lineItem

type LineItem struct {
	item     string
	quantity int
	total    int
}

func NewLineItem(anItem string, aQuantity int, aTotal int) LineItem {
	return LineItem{item: anItem, quantity: aQuantity, total: aTotal}
}

func (li *LineItem) Total() int {
	return li.total
}

func (li *LineItem) AddToPurchaseMap(aListOfPurchases *map[string]int) {
	if _, ok := (*aListOfPurchases)[li.item]; !ok {
		(*aListOfPurchases)[li.item] = 0
	}
	(*aListOfPurchases)[li.item] += li.quantity
}
