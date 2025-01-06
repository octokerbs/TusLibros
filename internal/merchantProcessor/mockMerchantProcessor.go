package merchantProcessor

import (
	"github.com/KerbsOD/TusLibros/internal/creditCard"
	"github.com/stretchr/testify/mock"
)

type MockMerchantProcessor struct {
	mock.Mock
	creditCardUsed *creditCard.CreditCard
	debitedAmount  int
}

func NewMockMerchantProcessor() *MockMerchantProcessor {
	mmp := &MockMerchantProcessor{creditCardUsed: nil, debitedAmount: -1}
	mmp.On("DebitOn", mock.Anything, mock.Anything).Return(nil)
	return mmp
}

func (mmp *MockMerchantProcessor) DebitOn(anAmount int, aCreditCard *creditCard.CreditCard) error {
	args := mmp.Called(anAmount, aCreditCard)
	if args.Error(0) != nil {
		return args.Error(0)
	}

	mmp.creditCardUsed = aCreditCard
	mmp.debitedAmount = anAmount
	return nil
}

func (mmp *MockMerchantProcessor) UsedCard() *creditCard.CreditCard {
	return mmp.creditCardUsed
}

func (mmp *MockMerchantProcessor) DebitedAmount() int {
	return mmp.debitedAmount
}
