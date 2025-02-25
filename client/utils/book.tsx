import {JSX} from "react";
import {Book} from "@/types/cart";

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
