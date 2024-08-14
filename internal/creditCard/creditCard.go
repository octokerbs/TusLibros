package creditCard

import "time"

type CreditCard struct {
	expirationDate time.Time
}

func NewCreditCardExpiringOn(anExpirationDate time.Time) *CreditCard {
	return &CreditCard{expirationDate: anExpirationDate}
}

func (cc *CreditCard) IsExpiredOn(aDate time.Time) bool {
	return cc.expirationDate.Before(aDate)
}
