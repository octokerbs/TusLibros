package main

import "github.com/KerbsOD/TusLibros/internal/book"

func NewCatalog() *map[string]book.Book {
	Book1 := book.NewBook("Mistborn: Secret History", "978-1473225046", 20820, "/images/SecretHistory.jpg")
	Book2 := book.NewBook("The Well Of Ascension", "978-0765316882", 21189, "/images/TheWellOfAscension.jpg")
	Book3 := book.NewBook("Shadows", "978-0765378569", 17584, "/images/ShadowsOfSelf.jpg")
	Book4 := book.NewBook("1984", "978-1443434973", 13298, "/images/1984.jpg")
	Book5 := book.NewBook("Fahrenheit 451", "978-1451673319", 9050, "/images/Fahrenheit-451.jpg")
	Book6 := book.NewBook("A Clash Of Kings", "978-0345535412", 9920, "/images/AClashOfKings.jpg")
	Book7 := book.NewBook("Asi Hablo Zaratustra", "979-8422117086", 10560, "/images/AsiHabloZaratustra.jpg")
	Book8 := book.NewBook("Introduction to Algorithms, fourth edition", "978-0262046305", 129600, "/images/Cormen.jpg")
	Book9 := book.NewBook("Design Patterns", "978-0201633610", 38280, "/images/DesignPatterns.jpg")
	Book10 := book.NewBook("El Hombre Mas Rico de Babilonia", "978-1954839496", 5999, "/images/ElHombreMasRicoDeBabilonia.jpg")
	Book11 := book.NewBook("El Principe", "979-8712157877", 7999, "/images/ElPrincipe.jpg")
	Book12 := book.NewBook("The Hobbit", "978-0547928227", 10690, "/images/TheHobbit.jpg")
	Book13 := book.NewBook("Pensando en maquinas que piensan", "978-8447394104", 5999, "/images/PensandoEnMaquinasQuePiensan.jpg")
	Book14 := book.NewBook("How To Win Friends And Influence People", "978-1982171452", 18290, "/images/HowToWinFriendsAndInfluencePeople.jpg")
	Book15 := book.NewBook("Learning Go", "978-1492077213", 33670, "/images/LearningGo.jpg")

	return &map[string]book.Book{
		Book1.ISBN():  Book1,
		Book2.ISBN():  Book2,
		Book3.ISBN():  Book3,
		Book4.ISBN():  Book4,
		Book5.ISBN():  Book5,
		Book6.ISBN():  Book6,
		Book7.ISBN():  Book7,
		Book8.ISBN():  Book8,
		Book9.ISBN():  Book9,
		Book10.ISBN(): Book10,
		Book11.ISBN(): Book11,
		Book12.ISBN(): Book12,
		Book13.ISBN(): Book13,
		Book14.ISBN(): Book14,
		Book15.ISBN(): Book15,
	}
}
