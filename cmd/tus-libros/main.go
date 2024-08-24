package main

import (
	"github.com/KerbsOD/TusLibros/internal"
	"github.com/KerbsOD/TusLibros/internal/clock"
	"github.com/KerbsOD/TusLibros/internal/merchantProcessor"
	"github.com/KerbsOD/TusLibros/internal/userAuthentication"
	"github.com/KerbsOD/TusLibros/pkg/api"
	"net/http"
)

func main() {
	catalog := map[string]float64{"978-0553579901": 19.99, "979-8712157877": 9.99}
	mockMerchantProcessor := merchantProcessor.NewLocalMerchantProcessor()
	mockClock := clock.NewLocalClock()
	mockUserAuthentication := userAuthentication.NewLocalUserAuthentication()
	systemFacade := internal.NewSystemFacade(catalog, mockUserAuthentication, mockMerchantProcessor, mockClock)

	handler := &api.Handler{
		Facade: systemFacade,
	}

	http.HandleFunc("/CreateCart", handler.CreateCart)
	http.HandleFunc("/AddToCart", handler.AddToCart)
	http.HandleFunc("/ListCart", handler.ListCart)
	http.HandleFunc("/CheckOutCart", handler.CheckOutCart)
	http.HandleFunc("/ListPurchases", handler.ListPurchases)

	port := ":8080"
	if err := http.ListenAndServe(port, nil); err != nil {
		panic(err)
	}
}
