package main

type Book struct {
	name      string
	isbn      string
	price     int
	imagePath string
}

func newCatalog() []Book {
	return []Book{
		{
			name:      "Mistborn: Secret History",
			isbn:      "978-1473225046",
			price:     20820,
			imagePath: "/images/SecretHistory.jpg",
		},
		{
			name:      "The Well Of Ascension",
			isbn:      "978-0765316882",
			price:     21189,
			imagePath: "/images/TheWellOfAscension.jpg",
		},
		{
			name:      "Shadows",
			isbn:      "978-0765378569",
			price:     17584,
			imagePath: "/images/ShadowsOfSelf.jpg",
		},
	}
}
