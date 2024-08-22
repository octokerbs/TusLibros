package tus_libros

import (
	"time"
)

type CartSession struct {
	owner        *UserCredentials
	cart         *Cart
	clock        Clock
	lastUsedTime time.Time
}

func NewCartSession(aUser *UserCredentials, aCart *Cart, aClock Clock) *CartSession {
	return &CartSession{owner: aUser, cart: aCart, clock: aClock, lastUsedTime: aClock.Now()}
}

func (cs *CartSession) AddToCart(anItem string, aQuantity int) error {
	if err := cs.cart.AddToCart(anItem, aQuantity); err != nil {
		return err
	}

	return nil
}

func (cs *CartSession) ListCart() map[string]int {
	return cs.cart.ListCart()
}

func (cs *CartSession) CheckOutCartWith(aCreditCard *CreditCard, aMerchantProcessor MerchantProcessor, aSalesBook *SalesBook) error {
	aCashier, err := NewCashier(cs.cart, cs.owner, aCreditCard, aMerchantProcessor, cs.clock.Now(), aSalesBook)
	if err != nil {
		return err
	}

	_, err = aCashier.Checkout()
	if err != nil {
		return err
	}

	return nil
}

func (cs *CartSession) IsEmpty() bool {
	return cs.cart.IsEmpty()
}

func (cs *CartSession) IsExpired() bool {
	now := cs.clock.Now()
	lastTimePlus30Minutes := cs.lastUsedTime.Add(30 * time.Minute)

	if lastTimePlus30Minutes.After(now) {
		cs.updateLastUsedTimeTo(now)
		return false
	}

	return true
}

func (cs *CartSession) updateLastUsedTimeTo(now time.Time) {
	cs.lastUsedTime = now
}
