package testsObjectFactory

import (
	"github.com/KerbsOD/TusLibros/internal/creditCard"
	"github.com/KerbsOD/TusLibros/internal/merchantProcessor"
	"github.com/KerbsOD/TusLibros/internal/userAuthentication"
	"time"
)

type TestsObjectFactory struct {
}

func (t *TestsObjectFactory) ItemNotInCatalog() string {
	item := "Fahrenheit-451"
	return item
}

func (t *TestsObjectFactory) ItemInCatalog() string {
	item := "A Clash of Kings"
	return item
}

func (t *TestsObjectFactory) CatalogWithAnItemAndItsPrice() map[string]int {
	catalog := map[string]int{t.ItemInCatalog(): t.ItemInCatalogPrice()}
	return catalog
}

func (t *TestsObjectFactory) ItemInCatalogPrice() int {
	return 15
}

func (t *TestsObjectFactory) ExpiredCreditCard() *creditCard.CreditCard {
	validCreditCard := creditCard.NewCreditCardExpiringOn(t.Yesterday())
	return validCreditCard
}

func (t *TestsObjectFactory) ValidCreditCard() *creditCard.CreditCard {
	validCreditCard := creditCard.NewCreditCardExpiringOn(t.Tomorrow())
	return validCreditCard
}

func (t *TestsObjectFactory) NewMockMerchantProcessor() *merchantProcessor.MockMerchantProcessor {
	mockService := new(merchantProcessor.MockMerchantProcessor)
	return mockService
}

func (t *TestsObjectFactory) Yesterday() time.Time {
	staticDateForTesting := time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC)
	return staticDateForTesting
}

func (t *TestsObjectFactory) Today() time.Time {
	staticDateForTesting := time.Date(2000, 1, 2, 0, 0, 0, 0, time.UTC)
	return staticDateForTesting
}

func (t *TestsObjectFactory) Tomorrow() time.Time {
	staticDateForTesting := time.Date(2000, 1, 3, 0, 0, 0, 0, time.UTC)
	return staticDateForTesting
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

func (t *TestsObjectFactory) NewMockUserAuthenticationWithValidUser() *userAuthentication.MockUserAuthentication {
	databaseWithValidUser := map[string]string{t.ValidUsername(): t.ValidPassword()}
	userAuthService := userAuthentication.NewMockUserAuthentication(databaseWithValidUser)
	return userAuthService
}

func (t *TestsObjectFactory) ValidCreditCardNumber() string {
	return "0000 1111 2222 3333"
}

func (t *TestsObjectFactory) ValidCreditCardOwner() string {
	return "Marty Mcfly"
}
