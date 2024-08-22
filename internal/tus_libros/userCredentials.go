package tus_libros

type UserCredentials struct {
	username string
	password string
}

func NewUserCredentials(aUsername, aPassword string) *UserCredentials {
	return &UserCredentials{username: aUsername, password: aPassword}
}

func (uc *UserCredentials) ValidCredentials(aUserAuthenticator UserAuthentication) bool {
	return aUserAuthenticator.RegisteredUser(uc.username, uc.password)
}
