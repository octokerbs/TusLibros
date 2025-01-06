package testsObjectFactory

import (
	"time"

	"github.com/KerbsOD/TusLibros/internal/book"
	"github.com/KerbsOD/TusLibros/internal/clock"
	"github.com/KerbsOD/TusLibros/internal/creditCard"
	"github.com/KerbsOD/TusLibros/internal/userCredentials"
)

type TestsObjectFactory struct{}

func (t *TestsObjectFactory) ItemInCatalog() book.Book {
	return book.NewBook("Mistborn: Secret History", "978-1473225046", 20820, "/images/SecretHistory.jpg")
}

func (t *TestsObjectFactory) AnotherItemInCatalog() book.Book {
	return book.NewBook("The Well Of Ascension", "978-0765316882", 21189, "/images/TheWellOfAscension.jpg")
}

func (t *TestsObjectFactory) ItemNotInCatalog() book.Book {
	return book.NewBook("The Hobbit", "978-0544445789", -1, "")
}

func (t *TestsObjectFactory) NewCatalog() *map[string]book.Book {
	Book3 := book.NewBook("Shadows", "978-0765378569", 17584, "/images/ShadowsOfSelf.jpg")

	return &map[string]book.Book{
		t.ItemInCatalog().ISBN():        t.ItemInCatalog(),
		t.AnotherItemInCatalog().ISBN(): t.AnotherItemInCatalog(),
		Book3.ISBN():                    Book3,
	}
}

func (t *TestsObjectFactory) ExpiredCreditCard() *creditCard.CreditCard {
	validCreditCard := creditCard.NewCreditCardExpiringOn(t.Yesterday(), "1111222233334444")
	return validCreditCard
}

func (t *TestsObjectFactory) ValidCreditCard() *creditCard.CreditCard {
	validCreditCard := creditCard.NewCreditCardExpiringOn(t.Tomorrow(), "1111222233334444")
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
