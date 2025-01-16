package book

import "encoding/json"

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

func (b Book) MarshalJSON() ([]byte, error) {
	return json.Marshal(&struct {
		Name      string `json:"name"`
		ISBN      string `json:"isbn"`
		Price     int    `json:"price"`
		ImagePath string `json:"imagePath"`
	}{
		Name:      b.name,
		ISBN:      b.isbn,
		Price:     b.price,
		ImagePath: b.imagePath,
	})
}
