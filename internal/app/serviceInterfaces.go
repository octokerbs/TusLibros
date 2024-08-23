package app

import "time"

type UserAuthentication interface {
	RegisteredUser(username string, password string) bool
}

type MerchantProcessor interface {
	DebitOn(anAmount int, aCreditCard *CreditCard) error
}

type Clock interface {
	Now() time.Time
}
