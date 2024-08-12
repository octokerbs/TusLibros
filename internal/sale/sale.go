package sale

type Sale struct {
	total int
}

func NewSale(aTotal int) *Sale {
	s := new(Sale)
	s.total = aTotal
	return s
}

func (s *Sale) Total() int {
	return s.total
}
