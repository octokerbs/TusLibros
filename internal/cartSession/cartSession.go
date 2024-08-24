package cartSession

import (
	cart2 "github.com/KerbsOD/TusLibros/internal/cart"
	"github.com/KerbsOD/TusLibros/internal/cashier"
	"github.com/KerbsOD/TusLibros/internal/clock"
	"github.com/KerbsOD/TusLibros/internal/creditCard"
	"github.com/KerbsOD/TusLibros/internal/merchantProcessor"
	"github.com/KerbsOD/TusLibros/internal/salesBook"
	"github.com/KerbsOD/TusLibros/internal/userCredentials"
	"time"
)

type CartSession struct {
	owner        *userCredentials.UserCredentials
	cart         *cart2.Cart
	clock        clock.Clock
	lastUsedTime time.Time
}

func NewCartSession(aUser *userCredentials.UserCredentials, aCart *cart2.Cart, aClock clock.Clock) *CartSession {
	return &CartSession{owner: aUser, cart: aCart, clock: aClock, lastUsedTime: aClock.Now()}
}

func (cs *CartSession) AddToCart(anItem string, aQuantity int) error {
	if err := cs.cart.AddToCart(anItem, aQuantity); err != nil {
		return err
	}

	return nil
}

func (cs *CartSession) ListCart() (map[string]int, error) {
	return cs.cart.ListCart()
}

func (cs *CartSession) CheckOutCartWith(aCreditCard *creditCard.CreditCard, aMerchantProcessor merchantProcessor.MerchantProcessor, aSalesBook *salesBook.SalesBook) (int, error) {
	aCashier, err := cashier.NewCashier(cs.cart, cs.owner, aCreditCard, aMerchantProcessor, cs.clock.Now(), aSalesBook)
	if err != nil {
		return -1, err
	}

	transactionID, err := aCashier.Checkout()
	if err != nil {
		return -1, err
	}

	return transactionID, nil
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
