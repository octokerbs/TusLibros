package developmentLocalServices

import "time"

type LocalClock struct {
}

func NewLocalClock() *LocalClock {
	return &LocalClock{}
}

func (lc *LocalClock) Now() time.Time {
	return time.Date(2000, 1, 2, 0, 0, 0, 0, time.UTC)
}
