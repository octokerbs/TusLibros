import {JSX} from "react";

export type Book = {
    name: string;
    isbn: string;
    price: number;
    imagePath: string;
};

export function forEachBook(
    catalog: Record<string, Book>,
    items: Record<string, number>,
    renderContent: (book: Book, quantity: number) => JSX.Element
) {
    return Object.keys(items).map((item) => {
        const book = catalog[item];
        const quantity = items[item];
        return renderContent(book, quantity);
    });
}
