package merchantProcessor

import (
	"github.com/KerbsOD/TusLibros/internal/creditCard"
	"github.com/stretchr/testify/mock"
)

type MockMerchantProcessor struct {
	mock.Mock
	creditCardUsed *creditCard.CreditCard
	debitedAmount  float64
}

func NewMockMerchantProcessor() *MockMerchantProcessor {
	return &MockMerchantProcessor{creditCardUsed: nil, debitedAmount: -1}
}

func (mmp *MockMerchantProcessor) DebitOn(anAmount float64, aCreditCard *creditCard.CreditCard) error {
	if len(mmp.ExpectedCalls) > 0 {
		args := mmp.Called(anAmount, aCreditCard)
		if result, ok := args.Get(0).(error); ok {
			return result
		}
	}

	mmp.creditCardUsed = aCreditCard
	mmp.debitedAmount = anAmount
	return nil
}

func (mmp *MockMerchantProcessor) UsedCard() *creditCard.CreditCard {
	return mmp.creditCardUsed
}

func (mmp *MockMerchantProcessor) DebitedAmount() float64 {
	return mmp.debitedAmount
}
