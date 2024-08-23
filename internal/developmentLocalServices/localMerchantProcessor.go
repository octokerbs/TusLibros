package developmentLocalServices

import (
	"errors"
	"github.com/KerbsOD/TusLibros/internal/app"
	"github.com/KerbsOD/TusLibros/internal/errorMessages"
	"time"
)

type LocalMerchantProcessor struct {
	validCreditCardNumber             string
	validCreditCardNumberWithoutFunds string
}

func NewLocalMerchantProcessor() *LocalMerchantProcessor {
	return &LocalMerchantProcessor{"1111222233334444", "5555666677778888"}
}

func (lmp *LocalMerchantProcessor) DebitOn(anAmount int, aCreditCard *app.CreditCard) error {
	if aCreditCard.IsExpiredOn(time.Now()) {
		return errors.New(errorMessages.InvalidCreditCard)
	}

	if aCreditCard.Number() == lmp.validCreditCardNumberWithoutFunds {
		return errors.New(errorMessages.InvalidCreditCard)
	}

	if aCreditCard.Number() != lmp.validCreditCardNumber {
		return errors.New(errorMessages.InvalidCreditCard)
	}

	return nil
}
