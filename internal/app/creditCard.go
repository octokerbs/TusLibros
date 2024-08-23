package app

import "time"

type CreditCard struct {
	expirationDate time.Time
	number         string
}

func NewCreditCardExpiringOn(anExpirationDate time.Time, aNumber string) *CreditCard {
	return &CreditCard{expirationDate: anExpirationDate, number: aNumber}
}

func (cc *CreditCard) IsExpiredOn(aDate time.Time) bool {
	return cc.expirationDate.Before(aDate)
}

func (cc *CreditCard) Number() string {
	return cc.number
}
