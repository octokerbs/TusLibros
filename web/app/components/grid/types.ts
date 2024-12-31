import { Book } from "../types";

export type BookCardProps = {
    onUpdateCart: (book: Book, quantity: number) => void;
    book: Book;
};
