package creditCard

import "time"

type CreditCard struct {
	expiringDate time.Time
}

func NewCreditCardExpiringOn(anExpiringDate time.Time) *CreditCard {
	cc := new(CreditCard)
	cc.expiringDate = anExpiringDate
	return cc
}

func (cc *CreditCard) IsExpiredOn(aDate time.Time) bool {
	return cc.expiringDate.Before(aDate)
}
