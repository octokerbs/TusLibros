package clock

import (
	"github.com/stretchr/testify/mock"
	"time"
)

type MockClock struct {
	mock.Mock
	now time.Time
}

func NewMockClock() *MockClock {
	return &MockClock{now: time.Date(2000, 1, 2, 0, 0, 0, 0, time.UTC)}
}

func (mc *MockClock) Now() time.Time {
	if len(mc.ExpectedCalls) > 0 {
		args := mc.Called()
		if result, ok := args.Get(0).(time.Time); ok {
			return result
		}
	}
	return mc.now
}
