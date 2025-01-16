package userAuthentication

type UserAuthentication interface {
	RegisteredUser(username string, password string) bool
}
