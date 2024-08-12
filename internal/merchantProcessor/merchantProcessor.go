package merchantProcessor

import (
	"errors"
	"github.com/KerbsOD/TusLibros/internal/creditCard"
	"github.com/stretchr/testify/mock"
)

type MerchantProcessor interface {
	DebitOn(anAmount int, aCreditCard *creditCard.CreditCard) error
}

type MockMerchantProcessor struct {
	mock.Mock
	creditCardUsed        *creditCard.CreditCard
	debitedAmount         int
	insufficientFundsMode bool
}

func (mmp *MockMerchantProcessor) UsedCard() *creditCard.CreditCard {
	return mmp.creditCardUsed
}

func (mmp *MockMerchantProcessor) DebitedAmount() int {
	return mmp.debitedAmount
}

func (mmp *MockMerchantProcessor) ActivateInsufficientFundsMode() {
	mmp.insufficientFundsMode = true
}

func (mmp *MockMerchantProcessor) DebitOn(anAmount int, aCreditCard *creditCard.CreditCard) error {
	if mmp.insufficientFundsMode {
		return errors.New(InvalidCreditCard)
	}

	mmp.creditCardUsed = aCreditCard
	mmp.debitedAmount = anAmount
	return nil
}
