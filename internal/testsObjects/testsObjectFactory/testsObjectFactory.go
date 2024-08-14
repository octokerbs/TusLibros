package testsObjectFactory

import (
	"github.com/KerbsOD/TusLibros/internal/creditCard"
	"github.com/KerbsOD/TusLibros/internal/testsObjects/mocks/clock"
	"github.com/KerbsOD/TusLibros/internal/userCredentials"
	"time"
)

type TestsObjectFactory struct{}

func (t *TestsObjectFactory) ItemNotInCatalog() string {
	item := "Fahrenheit-451"
	return item
}

func (t *TestsObjectFactory) ItemInCatalog() string {
	item := "A Clash of Kings"
	return item
}

func (t *TestsObjectFactory) AnotherItemInCatalog() string {
	item := "El Principe"
	return item
}

func (t *TestsObjectFactory) CatalogWithAnItemAndItsPrice() map[string]int {
	catalog := map[string]int{t.ItemInCatalog(): t.ItemInCatalogPrice()}
	catalog[t.ItemInCatalog()] = t.ItemInCatalogPrice()
	catalog[t.AnotherItemInCatalog()] = t.AnotherItemInCatalogPrice()
	return catalog
}

func (t *TestsObjectFactory) ItemInCatalogPrice() int {
	return 15
}

func (t *TestsObjectFactory) AnotherItemInCatalogPrice() int {
	return 5
}

func (t *TestsObjectFactory) ExpiredCreditCard() *creditCard.CreditCard {
	validCreditCard := creditCard.NewCreditCardExpiringOn(t.Yesterday())
	return validCreditCard
}

func (t *TestsObjectFactory) ValidCreditCard() *creditCard.CreditCard {
	validCreditCard := creditCard.NewCreditCardExpiringOn(t.Tomorrow())
	return validCreditCard
}

func (t *TestsObjectFactory) Yesterday() time.Time {
	staticDateForTesting := clock.NewMockClock().Now()
	dayBeforeStaticDateForTesting := staticDateForTesting.AddDate(0, 0, -1)
	return dayBeforeStaticDateForTesting
}

func (t *TestsObjectFactory) Today() time.Time {
	staticDateForTesting := clock.NewMockClock().Now()
	return staticDateForTesting
}

func (t *TestsObjectFactory) Tomorrow() time.Time {
	staticDateForTesting := clock.NewMockClock().Now()
	dayAfterStaticDateForTesting := staticDateForTesting.AddDate(0, 0, 1)
	return dayAfterStaticDateForTesting
}

func (t *TestsObjectFactory) ValidUsername() string {
	return "ValidUsername"
}

func (t *TestsObjectFactory) ValidPassword() string {
	return "ValidPassword"
}

func (t *TestsObjectFactory) InvalidUsername() string {
	return "InvalidUsername"
}

func (t *TestsObjectFactory) InvalidPassword() string {
	return "InvalidPassword"
}

func (t *TestsObjectFactory) ValidCreditCardNumber() string {
	return "0000 1111 2222 3333"
}

func (t *TestsObjectFactory) ValidCreditCardOwner() string {
	return "Marty Mcfly"
}

func (t *TestsObjectFactory) ValidUserCredentials() *userCredentials.UserCredentials {
	return userCredentials.NewUserCredentials(t.ValidUsername(), t.ValidPassword())
}

func (t *TestsObjectFactory) InvalidUserCredentials() *userCredentials.UserCredentials {
	return userCredentials.NewUserCredentials(t.InvalidUsername(), t.InvalidPassword())
}
