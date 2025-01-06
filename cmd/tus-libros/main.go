package main

import (
	"log"
	"net/http"

	"github.com/KerbsOD/TusLibros/internal"
	"github.com/KerbsOD/TusLibros/internal/api"
	"github.com/KerbsOD/TusLibros/internal/clock"
	"github.com/KerbsOD/TusLibros/internal/merchantProcessor"
	"github.com/KerbsOD/TusLibros/internal/userAuthentication"
)

func main() {
	catalog := NewCatalog()
	mockMerchantProcessor := merchantProcessor.NewLocalMerchantProcessor()
	mockClock := clock.NewLocalClock()
	mockUserAuthentication := userAuthentication.NewLocalUserAuthentication()

	systemFacade := internal.NewSystemFacade(*catalog, mockUserAuthentication, mockMerchantProcessor, mockClock)

	handler := &api.Handler{
		Facade: systemFacade,
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/CreateCart", handler.CreateCart)
	mux.HandleFunc("/AddToCart", handler.AddToCart)
	mux.HandleFunc("/ListCart", handler.ListCart)
	mux.HandleFunc("/CheckOutCart", handler.CheckOutCart)
	mux.HandleFunc("/ListPurchases", handler.ListPurchases)

	port := ":8080"
	log.Println("Listening to port 8080")
	if err := http.ListenAndServe(port, enableCORS(mux)); err != nil {
		panic(err)
	}
}
