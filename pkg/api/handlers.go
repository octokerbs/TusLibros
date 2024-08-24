package api

import (
	"encoding/json"
	"github.com/KerbsOD/TusLibros/internal"
	"github.com/KerbsOD/TusLibros/internal/userCredentials"
	"net/http"
)

type Handler struct {
	Facade *internal.SystemFacade
}

func (h *Handler) CreateCart(w http.ResponseWriter, r *http.Request) {
	var request CreateCartRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := CreateCartResponse{
			Status:  1,
			Message: "Invalid request payload",
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	user := userCredentials.NewUserCredentials(request.ClientID, request.Password)
	cartID, err := h.Facade.CreateCart(user)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := CreateCartResponse{
			Status:  1,
			Message: internal.InvalidUserOrPasswordErrorMessage,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	response := CreateCartResponse{
		Status: 0,
		CartID: cartID,
	}
	w.WriteHeader(http.StatusOK)
	if err = json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

func (h *Handler) AddToCart(w http.ResponseWriter, r *http.Request) {
	var request AddToCartRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := AddToCartResponse{
			Status:  1,
			Message: "Invalid request payload",
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	err := h.Facade.AddToCart(request.CartID, request.BookISBN, request.BookQuantity)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := AddToCartResponse{
			Status:  1,
			Message: err.Error(),
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	response := AddToCartResponse{
		Status:  0,
		Message: "OK",
	}
	w.WriteHeader(http.StatusOK)
	if err = json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

func (h *Handler) ListCart(w http.ResponseWriter, r *http.Request) {
	var request ListCartRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := ListCartResponse{
			Status:  1,
			Message: "Invalid request payload",
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	items, err := h.Facade.ListCart(request.CartID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := ListCartResponse{
			Status:  1,
			Message: err.Error(),
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	response := ListCartResponse{
		Status: 0,
		Items:  items,
	}
	w.WriteHeader(http.StatusOK)
	if err = json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

func (h *Handler) CheckOutCart(w http.ResponseWriter, r *http.Request) {
	var request CheckOutCartRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := CheckOutCartResponse{
			Status:  1,
			Message: "Invalid request payload",
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	transactionID, err := h.Facade.CheckOutCart(request.CartID, request.CreditCardNumber, request.CreditCardExpirationDate, request.CreditCardNumber)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := CheckOutCartResponse{
			Status:  1,
			Message: err.Error(),
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	response := CheckOutCartResponse{
		Status:        0,
		TransactionID: transactionID,
	}
	w.WriteHeader(http.StatusOK)
	if err = json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

func (h *Handler) ListPurchases(w http.ResponseWriter, r *http.Request) {
	var request ListPurchasesRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := ListPurchasesResponse{
			Status:  1,
			Message: "Invalid request payload",
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	user := userCredentials.NewUserCredentials(request.ClientID, request.Password)
	items, err := h.Facade.ListPurchasesOf(user)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := ListPurchasesResponse{
			Status:  1,
			Message: err.Error(),
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	response := ListPurchasesResponse{
		Status: 0,
		Items:  items,
	}
	w.WriteHeader(http.StatusOK)
	if err = json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}
