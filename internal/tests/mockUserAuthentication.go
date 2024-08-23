package tests

import (
	"github.com/stretchr/testify/mock"
)

type MockUserAuthentication struct {
	mock.Mock
}

func NewMockUserAuthentication() *MockUserAuthentication {
	return &MockUserAuthentication{}
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
