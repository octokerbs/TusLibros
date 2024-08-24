package lineItem

type LineItem struct {
	item  string
	total float64
}

func NewLineItem(anItem string, aTotal float64) LineItem {
	return LineItem{item: anItem, total: aTotal}
}

func (li *LineItem) Total() float64 {
	return li.total
}

func (li *LineItem) AddToPurchaseMap(aListOfPurchases *map[string]float64) {
	if _, ok := (*aListOfPurchases)[li.item]; !ok {
		(*aListOfPurchases)[li.item] = 0
	}
	(*aListOfPurchases)[li.item] += li.total
}
