import { useCallback, useState } from "react";
import { CartBookEntry, Book } from "../types";
import { formatCurrency, extractNumericPrice } from "../utils/price";

export default function useCart() {
    const [cartBooks, setCartBooks] = useState<CartBookEntry[]>([]);

    const total = formatCurrency(
        cartBooks.reduce((acc, item) => acc + item.total, 0)
    );

    const addToCart = useCallback((book: Book, quantity: number) => {
        if (quantity <= 0) return;

        setCartBooks((prevBooks) => {
            const existingBookIndex = prevBooks.findIndex(
                (item) => item.book.isbn === book.isbn
            );

            const bookPrice = extractNumericPrice(book.price);
            const newQuantity =
                existingBookIndex >= 0
                    ? prevBooks[existingBookIndex].quantity + quantity
                    : quantity;
            const total = bookPrice * newQuantity;

            if (existingBookIndex >= 0) {
                const newBooks = [...prevBooks];
                newBooks[existingBookIndex] = {
                    book,
                    quantity: newQuantity,
                    total,
                };
                return newBooks;
            }

            return [...prevBooks, { book, quantity, total }];
        });
    }, []);

    const clearCart = useCallback(() => setCartBooks([]), []);

    return { cartBooks, addToCart, clearCart, total };
}
