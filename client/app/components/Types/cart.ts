export type CartBookEntry = {
        book: Book;
        quantity: number;
        total: number;
};

export type Book = {
        name: string;
        isbn: string;
        price: number;
        imagePath: string;
};
