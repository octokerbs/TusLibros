package userAuthentication

type LocalUserAuthentication struct {
	usersAndPasswords map[string]string
}

func NewLocalUserAuthentication() *LocalUserAuthentication {
	return &LocalUserAuthentication{map[string]string{"Octo": "Kerbs", "Norberto": "Lining", "Hernan": "Wilkinson"}}
}

func (l *LocalUserAuthentication) RegisteredUser(username string, password string) bool {
	if realPassword, ok := l.usersAndPasswords[username]; ok {
		return password == realPassword
	}
	return false
}
