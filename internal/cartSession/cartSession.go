package cartSession

import (
	"github.com/KerbsOD/TusLibros/internal/cart"
	"github.com/KerbsOD/TusLibros/internal/cashier"
	"github.com/KerbsOD/TusLibros/internal/creditCard"
	"github.com/KerbsOD/TusLibros/internal/salesBook"
	"github.com/KerbsOD/TusLibros/internal/testsObjects/mocks/clock"
	"github.com/KerbsOD/TusLibros/internal/testsObjects/mocks/merchantProcessor"
	"time"
)

type CartSession struct {
	cart         *cart.Cart
	owner        string
	clock        clock.Clock
	lastUsedTime time.Time
}

func NewCartSession(aUsername string, aCart *cart.Cart, aClock clock.Clock) *CartSession {
	cs := new(CartSession)
	cs.cart = aCart
	cs.owner = aUsername
	cs.clock = aClock
	cs.lastUsedTime = aClock.Now()
	return cs
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

func (cs *CartSession) CheckOutCartWith(aCreditCard *creditCard.CreditCard, aMerchantProcessor merchantProcessor.MerchantProcessor, aSalesBook *salesBook.SalesBook) error {
	aCashier, err := cashier.NewCashier(cs.cart, cs.owner, aCreditCard, aMerchantProcessor, cs.clock.Now(), aSalesBook)
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
