package testsObjectFactory

import (
	"github.com/KerbsOD/TusLibros/internal/creditCard"
	"github.com/KerbsOD/TusLibros/internal/merchantProcessor"
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

func (t *TestsObjectFactory) MockMerchantProcessor() *merchantProcessor.MockMerchantProcessor {
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
