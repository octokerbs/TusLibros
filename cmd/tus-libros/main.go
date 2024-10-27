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

func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {
	catalog := map[string]float64{"978-0553579901": 19.99, "979-8712157877": 9.99}
	mockMerchantProcessor := merchantProcessor.NewLocalMerchantProcessor()
	mockClock := clock.NewLocalClock()
	mockUserAuthentication := userAuthentication.NewLocalUserAuthentication()
	systemFacade := internal.NewSystemFacade(catalog, mockUserAuthentication, mockMerchantProcessor, mockClock)

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
