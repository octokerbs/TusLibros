package main

import "github.com/KerbsOD/TusLibros/internal/book"

func NewCatalog() *map[string]book.Book {
	Book1 := book.NewBook("Mistborn: Secret History", "978-1473225046", 20820, "/images/SecretHistory.jpg")
	Book2 := book.NewBook("The Well Of Ascension", "978-0765316882", 21189, "/images/TheWellOfAscension.jpg")
	Book3 := book.NewBook("Shadows", "978-0765378569", 17584, "/images/ShadowsOfSelf.jpg")

	return &map[string]book.Book{
		Book1.ISBN(): Book1,
		Book2.ISBN(): Book2,
		Book3.ISBN(): Book3,
	}
}
