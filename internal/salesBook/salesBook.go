package salesBook

import (
	"errors"
	"github.com/KerbsOD/TusLibros/internal/sale"
)

type SalesBook struct {
	sales []*sale.Sale
}

func NewSalesBook() *SalesBook {
	sb := new(SalesBook)
	sb.sales = make([]*sale.Sale, 0)
	return sb
}

func (sb *SalesBook) RegisterSaleOf(aTotal int) {
	sb.sales = append(sb.sales, sale.NewSale(aTotal))
}

func (sb *SalesBook) IsEmpty() bool {
	return len(sb.sales) == 0
}

func (sb *SalesBook) LastSale() *sale.Sale {
	if len(sb.sales) == 0 {
		panic(errors.New(EmptySalesErrorMessage))
	}
	return sb.sales[len(sb.sales)-1]
}
