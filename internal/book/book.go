package book

type Book struct {
	name      string
	isbn      string
	price     int
	imagePath string
}

func NewBook(name, isbn string, price int, imagePath string) Book {
	return Book{name: name, isbn: isbn, price: price, imagePath: imagePath}
}

func (b Book) CalculatePrice(quantity int) int {
	return b.price * quantity
}

func (b Book) ISBN() string {
	return b.isbn
}
