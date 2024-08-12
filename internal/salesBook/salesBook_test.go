package salesBook

import (
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
	"testing"
)

type SalesBookTestSuite struct {
	suite.Suite
}

func TestSalesBookTestSuite(t *testing.T) {
	suite.Run(t, new(SalesBookTestSuite))
}

func (s *SalesBookTestSuite) Test01LastSaleOnEmptySalesBookPanics() {
	salesBook := NewSalesBook()
	assert.PanicsWithError(s.T(), EmptySalesErrorMessage, func() {
		salesBook.LastSale()
	})
}
