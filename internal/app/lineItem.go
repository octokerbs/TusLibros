package app

type LineItem struct {
	item  string
	total int
}

func NewLineItem(anItem string, aTotal int) LineItem {
	return LineItem{item: anItem, total: aTotal}
}

func (li *LineItem) Total() int {
	return li.total
}

func (li *LineItem) AddToPurchaseMap(aListOfPurchases *map[string]int) {
	if _, ok := (*aListOfPurchases)[li.item]; !ok {
		(*aListOfPurchases)[li.item] = 0
	}
	(*aListOfPurchases)[li.item] += li.total
}
