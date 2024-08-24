package merchantProcessor

import "github.com/KerbsOD/TusLibros/internal/creditCard"

type MerchantProcessor interface {
	DebitOn(anAmount float64, aCreditCard *creditCard.CreditCard) error
}
