package localServices

type LocalUserAuthentication struct {
	usersAndPasswords map[string]string
}

func NewLocalUserAuthentication(fixedUsers map[string]string) *LocalUserAuthentication {
	return &LocalUserAuthentication{fixedUsers}
}

func (l *LocalUserAuthentication) RegisteredUser(username string, password string) bool {
	if realPassword, ok := l.usersAndPasswords[username]; ok {
		return password == realPassword
	}
	return false
}
