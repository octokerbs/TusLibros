package userAuthentication

import (
	"github.com/stretchr/testify/mock"
)

type UserAuthentication interface {
	RegisteredUser(username string, password string) bool
}

type MockUserAuthentication struct {
	mock.Mock
}

func NewMockUserAuthentication() *MockUserAuthentication {
	mua := new(MockUserAuthentication)
	return mua
}

func (mua *MockUserAuthentication) RegisteredUser(aUsername string, aPassword string) bool {
	if len(mua.ExpectedCalls) > 0 {
		args := mua.Called()
		if result, ok := args.Get(0).(bool); ok {
			return result
		}
	}

	return true
}
