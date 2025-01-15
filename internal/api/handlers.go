package api

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/KerbsOD/TusLibros/internal"
	"github.com/KerbsOD/TusLibros/internal/userCredentials"
	"github.com/KerbsOD/TusLibros/pkg/models"
)

type Handler struct {
	Facade *internal.SystemFacade
}

func (h *Handler) RequestCatalog(w http.ResponseWriter, r *http.Request) {
	log.Printf("---> /catalog")
	catalog, _ := h.Facade.Catalog()

	response := models.CatalogResponse{
		Status: 0,
		Items:  catalog,
	}

	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

func (h *Handler) CreateCart(w http.ResponseWriter, r *http.Request) {
	var request models.CreateCartRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := models.CreateCartResponse{
			Status:  1,
			Message: "Invalid request payload",
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	log.Printf("---> /createCart {ClientID: %s, Password: %s}", request.ClientID, request.Password)

	user := userCredentials.NewUserCredentials(request.ClientID, request.Password)
	cartID, err := h.Facade.CreateCart(user)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := models.CreateCartResponse{
			Status:  1,
			Message: internal.InvalidUserOrPasswordErrorMessage,
		}
		json.NewEncoder(w).Encode(response)
		log.Printf("Error: %s", err)
		return
	}

	response := models.CreateCartResponse{
		Status: 0,
		CartID: cartID,
	}
	log.Printf("<--- {CartID: %d}", response.CartID)

	w.WriteHeader(http.StatusOK)
	if err = json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

func (h *Handler) AddToCart(w http.ResponseWriter, r *http.Request) {
	var request models.AddToCartRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := models.AddToCartResponse{
			Status:  1,
			Message: "Invalid request payload",
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	log.Printf("---> /addToCart {CartID: %d, BookISBN: %s, BookQuantity: %d}", request.CartID, request.BookISBN, request.BookQuantity)

	err := h.Facade.AddToCart(request.CartID, request.BookISBN, request.BookQuantity)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := models.AddToCartResponse{
			Status:  1,
			Message: err.Error(),
		}
		json.NewEncoder(w).Encode(response)
		log.Printf("Error: %s", err)
		return
	}

	response := models.AddToCartResponse{
		Status:  0,
		Message: "OK",
	}
	log.Printf("<--- {}")

	w.WriteHeader(http.StatusOK)
	if err = json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

func (h *Handler) ListCart(w http.ResponseWriter, r *http.Request) {
	var request models.ListCartRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := models.ListCartResponse{
			Status:  1,
			Message: "Invalid request payload",
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	log.Printf("---> /listCart {CartID: %d}", request.CartID)

	items, err := h.Facade.ListCart(request.CartID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := models.ListCartResponse{
			Status:  1,
			Message: err.Error(),
		}
		json.NewEncoder(w).Encode(response)
		log.Printf("Error: %s", err)
		return
	}

	response := models.ListCartResponse{
		Status: 0,
		Items:  items,
	}
	log.Printf("<--- {Items: %v}", response.Items)

	w.WriteHeader(http.StatusOK)
	if err = json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

func (h *Handler) CheckOutCart(w http.ResponseWriter, r *http.Request) {
	var request models.CheckOutCartRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := models.CheckOutCartResponse{
			Status:  1,
			Message: "Invalid request payload",
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	log.Printf("---> /checkoutCart {CartID: %d, CCNumber: %s, CCExpirationDate: %s}", request.CartID, request.CreditCardNumber, request.CreditCardExpirationDate)

	transactionID, err := h.Facade.CheckOutCart(request.CartID, request.CreditCardNumber, request.CreditCardExpirationDate, request.CreditCardNumber)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := models.CheckOutCartResponse{
			Status:  1,
			Message: err.Error(),
		}
		json.NewEncoder(w).Encode(response)
		log.Printf("Error: %s", err)
		return
	}

	response := models.CheckOutCartResponse{
		Status:        0,
		TransactionID: transactionID,
	}
	log.Printf("<--- {TransactionID: %d}", response.TransactionID)

	w.WriteHeader(http.StatusOK)
	if err = json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

func (h *Handler) ListPurchases(w http.ResponseWriter, r *http.Request) {
	var request models.ListPurchasesRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := models.ListPurchasesResponse{
			Status:  1,
			Message: "Invalid request payload",
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	log.Printf("---> /listPurchases {ClientID: %s, Password: %s}", request.ClientID, request.Password)

	user := userCredentials.NewUserCredentials(request.ClientID, request.Password)
	items, err := h.Facade.ListPurchasesOf(user)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := models.ListPurchasesResponse{
			Status:  1,
			Message: err.Error(),
		}
		json.NewEncoder(w).Encode(response)
		log.Printf("Error: %s", err)
		return
	}

	response := models.ListPurchasesResponse{
		Status: 0,
		Items:  items,
	}
	log.Printf("<--- {Items: %v}", response.Items)

	w.WriteHeader(http.StatusOK)
	if err = json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}
