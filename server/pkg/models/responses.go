package models

import "github.com/KerbsOD/TusLibros/internal/book"

type CatalogResponse struct {
	Status  int                  `json:"status"`
	Items   map[string]book.Book `json:"items,omitempty"`
	Message string               `json:"message,omitempty"`
}

type CreateCartResponse struct {
	Status  int    `json:"status"`
	CartID  int    `json:"cartId,omitempty"`
	Message string `json:"message,omitempty"`
}

type AddToCartResponse struct {
	Status  int    `json:"status"`
	Message string `json:"message,omitempty"`
}

type ListCartResponse struct {
	Status  int            `json:"status"`
	Items   map[string]int `json:"items,omitempty"`
	Message string         `json:"message,omitempty"`
}

type CheckOutCartResponse struct {
	Status        int    `json:"status"`
	TransactionID int    `json:"transactionId,omitempty"`
	Message       string `json:"message,omitempty"`
}

type ListPurchasesResponse struct {
	Status  int            `json:"status"`
	Items   map[string]int `json:"items,omitempty"`
	Message string         `json:"message,omitempty"`
}
