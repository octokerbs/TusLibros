package localServices

import (
	"errors"
	"github.com/KerbsOD/TusLibros/internal/tus_libros"
	"time"
)

type LocalMerchantProcessor struct {
	validCreditCardNumber             string
	validCreditCardNumberWithoutFunds string
}

func NewLocalMerchantProcessor() *LocalMerchantProcessor {
	return &LocalMerchantProcessor{"1111222233334444", "5555666677778888"}
}

func (lmp *LocalMerchantProcessor) DebitOn(anAmount int, aCreditCard *tus_libros.CreditCard) error {
	if aCreditCard.IsExpiredOn(time.Now()) {
		return errors.New(tus_libros.InvalidCreditCard)
	}

	if aCreditCard.Number() == lmp.validCreditCardNumberWithoutFunds {
		return errors.New(tus_libros.InvalidCreditCard)
	}

	if aCreditCard.Number() != lmp.validCreditCardNumber {
		return errors.New(tus_libros.InvalidCreditCard)
	}

	return nil
}
