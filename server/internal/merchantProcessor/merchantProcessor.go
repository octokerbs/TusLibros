package merchantProcessor

import "github.com/KerbsOD/TusLibros/internal/creditCard"

type MerchantProcessor interface {
	DebitOn(anAmount int, aCreditCard *creditCard.CreditCard) error
}
