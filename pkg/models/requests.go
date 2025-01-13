package models

import "time"

type CatalogRequest struct {
}

type CreateCartRequest struct {
	ClientID string `json:"clientId"`
	Password string `json:"password"`
}

type AddToCartRequest struct {
	CartID       int    `json:"cartId"`
	BookISBN     string `json:"bookISBN"`
	BookQuantity int    `json:"bookQuantity"`
}

type ListCartRequest struct {
	CartID int `json:"cartId"`
}

type CheckOutCartRequest struct {
	CartID                   int       `json:"cartId"`
	CreditCardNumber         string    `json:"creditCardNumber"`
	CreditCardExpirationDate time.Time `json:"creditCardExpirationDate"`
	CreditCardOwner          string    `json:"creditCardOwner"`
}

type ListPurchasesRequest struct {
	ClientID string `json:"clientId"`
	Password string `json:"password"`
}
