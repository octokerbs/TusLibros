package merchantProcessor

import (
	"errors"
	"github.com/KerbsOD/TusLibros/internal/creditCard"
)

type LocalMerchantProcessor struct {
	validCreditCardNumber string
}

func NewLocalMerchantProcessor() *LocalMerchantProcessor {
	return &LocalMerchantProcessor{"1111222233334444"}
}

func (lmp *LocalMerchantProcessor) DebitOn(anAmount float64, aCreditCard *creditCard.CreditCard) error {
	if aCreditCard.Number() != lmp.validCreditCardNumber {
		return errors.New(InvalidCreditCardErrorMessage)
	}

	return nil
}
