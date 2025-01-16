package clock

import "time"

type LocalClock struct {
}

func NewLocalClock() *LocalClock {
	return &LocalClock{}
}

func (lc *LocalClock) Now() time.Time {
	return time.Now()
}
