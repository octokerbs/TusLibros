package userCredentials

import "github.com/KerbsOD/TusLibros/internal/userAuthentication"

type UserCredentials struct {
	username string
	password string
}

func NewUserCredentials(aUsername, aPassword string) *UserCredentials {
	return &UserCredentials{username: aUsername, password: aPassword}
}

func (uc *UserCredentials) ValidCredentials(aUserAuthenticator userAuthentication.UserAuthentication) bool {
	return aUserAuthenticator.RegisteredUser(uc.username, uc.password)
}

func (uc *UserCredentials) SameCredentialsAs(aUserCredentials *UserCredentials) bool {
	return uc.username == aUserCredentials.username && uc.password == aUserCredentials.password
}
