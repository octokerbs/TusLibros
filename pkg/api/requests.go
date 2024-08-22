package api

type CartRequest struct {
	ClientID string `json:"clientId"`
	Password string `json:"password"`
}
