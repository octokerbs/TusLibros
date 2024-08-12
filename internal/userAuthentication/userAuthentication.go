package userAuthentication

import (
	"github.com/stretchr/testify/mock"
)

type UserAuthentication interface {
	RegisteredUser(username string, password string) bool
}

type MockUserAuthentication struct {
	mock.Mock
	database map[string]string
}

func NewMockUserAuthentication(aUserDatabase map[string]string) *MockUserAuthentication {
	mua := new(MockUserAuthentication)
	mua.database = aUserDatabase
	return mua
}

func (mua *MockUserAuthentication) RegisteredUser(aUsername string, aPassword string) bool {
	if password, ok := mua.database[aUsername]; ok {
		return password == aPassword
	}
	return false
}
