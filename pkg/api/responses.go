package api

type CartResponse struct {
	Status  int    `json:"status"`
	CartID  int    `json:"cartId,omitempty"`
	Message string `json:"message,omitempty"`
}
