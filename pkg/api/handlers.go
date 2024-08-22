package api

import (
	"encoding/json"
	"fmt"
	"github.com/KerbsOD/TusLibros/internal/localServices"
	"github.com/KerbsOD/TusLibros/internal/tus_libros"
	"net/http"
)

func NewDevelopmentFacade() *tus_libros.SystemFacade {
	catalog := map[string]int{"A Clash Of Kings": 20, "The Prince": 10}
	localUserAuthenticationSystem := localServices.NewLocalUserAuthentication(map[string]string{"Octo": "Kerbs", "Luca": "Zarecki"})
	localMerchantProcessor := localServices.NewLocalMerchantProcessor()
	localClock := localServices.NewLocalClock()
	return tus_libros.NewSystemFacade(catalog, localUserAuthenticationSystem, localMerchantProcessor, localClock)
}

func CreateCart(w http.ResponseWriter, r *http.Request) {
	tusLibros := NewDevelopmentFacade()

	var req CartRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}

	if req.ClientID == "" || req.Password == "" {
		http.Error(w, "1 | ClientID and Password are required", http.StatusBadRequest)
		return
	}

	user := tus_libros.NewUserCredentials(req.ClientID, req.Password)
	_, err := tusLibros.CreateCart(user)
	if err != nil {
		http.Error(w, fmt.Sprintf("1 | %s", tus_libros.InvalidUserOrPasswordErrorMessage), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := map[string]string{"message": "0 | 1"}
	if err = json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

func AddToCart(w http.ResponseWriter, r *http.Request) {

}

func ListCart(w http.ResponseWriter, r *http.Request) {

}

func CheckOutCart(w http.ResponseWriter, r *http.Request) {

}

func ListPurchases(w http.ResponseWriter, r *http.Request) {

}
