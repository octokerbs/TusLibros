"use client";

import Box from "@mui/material/Box";
import BookGrid from "./Grid";
import Header from "./Header";
import { useEffect, useState } from "react";
import React from "react";
import Compras from "./Compras";
import { Book } from "@mui/icons-material";
import CheckoutPopup from "./CheckoutPopup";
import { SnackbarOrigin } from "@mui/material/Snackbar/Snackbar";

export type Book = {
        name: string;
        isbn: string;
        price: string;
        imagePath: string;
};

export enum UserState {
        ValidUser,
        InvalidUser,
        ExpiredCreditCardUser,
        NoFundsCreditCardUser,
}

export type CartBookEntry = {
        book: Book;
        quantity: number;
        total: number;
};

interface State extends SnackbarOrigin {
        open: boolean;
}

const books = new Map<string, Book>();

export default function Content() {
        books.set("978-1473225046", {
                name: "Mistborn: Secret History",
                isbn: "978-1473225046",
                price: "$20,820",
                imagePath: "/images/SecretHistory.jpg",
        });

        books.set("978-0765316882", {
                name: "The Well Of Ascension",
                isbn: "978-0765316882",
                price: "$21,189",
                imagePath: "/images/TheWellOfAscension.jpg",
        });

        books.set("978-0765378569", {
                name: "Shadows",
                isbn: "978-0765378569",
                price: "$17,584",
                imagePath: "/images/ShadowsOfSelf.jpg",
        });

        const [cartBooks, setCartBooks] = useState<CartBookEntry[]>([]);
        const [total, setTotal] = useState("$0.00");
        const [userState, setUserState] = useState(UserState.ValidUser);

        const [state, setState] = React.useState<State>({
                open: false,
                vertical: "top",
                horizontal: "center",
        });

        const { vertical, horizontal, open } = state;

        const handleClick = (newState: SnackbarOrigin) => () => {
                if (cartBooks.length == 0) {
                        return;
                }
                setState({ ...newState, open: true });
                setCartBooks([]);
        };

        const handleClose = () => {
                setState({ ...state, open: false });
        };

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
                                const items = [...cartBooks];
                                items[index] = {
                                        book: book,
                                        quantity:
                                                cartBooks[index].quantity +
                                                quantity,
                                        total:
                                                cartBooks[index].total +
                                                quantity *
                                                        Number(
                                                                book.price.replace(
                                                                        /[^0-9\.]+/g,
                                                                        ""
                                                                )
                                                        ),
                                };
                                setCartBooks(items);
                                return;
                        }
                }

                const newCartEntry: CartBookEntry = {
                        book: book,
                        quantity: quantity,
                        total:
                                quantity *
                                Number(book.price.replace(/[^0-9\.]+/g, "")),
                };

                setCartBooks([...cartBooks, newCartEntry]);
        };

        const handleUserState = (newUserState: UserState) => {
                setUserState(newUserState);
        };

        useEffect(() => {
                updateTotal();
        }, [cartBooks, updateTotal]);

        const [openCompras, setOpenCompras] = React.useState(false);
        const handleOpenCompras = () => setOpenCompras(true);
        const handleCloseCompras = () => setOpenCompras(false);

        return (
                <Box
                        sx={{
                                bgcolor: "#F3FCF0",
                                width: "100vw",
                                height: "100vh",
                                overflow: "auto",
                        }}
                >
                        <Header
                                cartBooks={cartBooks}
                                total={total}
                                handleOpenCompras={handleOpenCompras}
                                userState={userState}
                                handleUserState={handleUserState}
                                handleClick={handleClick}
                        ></Header>
                        <Compras
                                open={openCompras}
                                handleCloseCompras={handleCloseCompras}
                                books={books}
                        />
                        <BookGrid updateCart={updateCart}></BookGrid>
                        <CheckoutPopup
                                userState={userState}
                                handleClose={handleClose}
                                open={open}
                                vertical={vertical}
                                horizontal={horizontal}
                        />
                </Box>
        );
}
