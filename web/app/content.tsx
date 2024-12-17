"use client";

import Box from "@mui/material/Box";
import BookGrid from "./components/BookGrid";
import Header from "./components/HeaderBar";
import { useEffect, useState } from "react";

export type Book = {
    name: string;
    isbn: string;
    price: string;
    imagePath: string;
};

export type CartBookEntry = {
    book: Book;
    quantity: number;
    total: number;
};

export default function Content() {
    const [cartBooks, setCartBooks] = useState<CartBookEntry[]>([]);
    const [total, setTotal] = useState("$0.00");

    const updateTotal = () => {
        let sum = 0;
        for (let index = 0; index < cartBooks.length; index++) {
            sum += cartBooks[index].total;
        }

        const toCurrency = sum.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
        setTotal(toCurrency);
    };

    const updateCart = (book: Book, quantity: number) => {
        if (quantity <= 0) {
            return;
        }

        for (let index = 0; index < cartBooks.length; index++) {
            if (cartBooks[index].book.isbn == book.isbn) {
                let items = [...cartBooks];
                items[index] = {
                    book: book,
                    quantity: cartBooks[index].quantity + quantity,
                    total:
                        cartBooks[index].total +
                        quantity * Number(book.price.replace(/[^0-9\.]+/g, "")),
                };
                setCartBooks(items);
                return;
            }
        }

        const newCartEntry: CartBookEntry = {
            book: book,
            quantity: quantity,
            total: quantity * Number(book.price.replace(/[^0-9\.]+/g, "")),
        };

        setCartBooks([...cartBooks, newCartEntry]);
    };

    useEffect(() => {
        updateTotal();
    }, [cartBooks]);

    return (
        <Box
            sx={{
                bgcolor: "#F3FCF0",
                width: "100vw",
                height: "100vh",
                overflow: "auto",
            }}
        >
            <Header cartBooks={cartBooks} total={total}></Header>
            <BookGrid updateCart={updateCart}></BookGrid>
        </Box>
    );
}
