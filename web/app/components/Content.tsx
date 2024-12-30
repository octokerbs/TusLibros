"use client";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useEffect, useState, useCallback } from "react";
import BookGrid from "./grid/Grid";
import Header from "./header/Header";
import Compras from "./Compras";
import CheckoutPopup from "./CheckoutPopup";
import { INITIAL_BOOKS } from "../data/books";
import { formatCurrency, extractNumericPrice } from "../utils/price";
import { Book, CartBookEntry, SnackbarState, UserState } from "../types";

const ContentContainer = styled(Box)(({ theme }) => ({
        backgroundColor: theme.palette.background.default,
        width: "100vw",
        height: "100vh",
        overflow: "auto",
}));

interface HeaderProps {
        cartBooks: CartBookEntry[];
        total: string;
        onOpenCompras: () => void;
        userState: UserState;
        onUserStateChange: (state: UserState) => void;
        onCheckout: (
                position: Pick<SnackbarState, "vertical" | "horizontal">
        ) => void;
}

export default function Content() {
        const [cartBooks, setCartBooks] = useState<CartBookEntry[]>([]);
        const [total, setTotal] = useState("$0.00");
        const [userState, setUserState] = useState(UserState.ValidUser);
        const [isComprasOpen, setIsComprasOpen] = useState(false);
        const [snackbarState, setSnackbarState] = useState<SnackbarState>({
                open: false,
                vertical: "top",
                horizontal: "center",
        });

        const updateTotal = useCallback(() => {
                const sum = cartBooks.reduce(
                        (acc, item) => acc + item.total,
                        0
                );
                setTotal(formatCurrency(sum));
        }, [cartBooks]);

        const handleCheckout = useCallback(
                (position: Pick<SnackbarState, "vertical" | "horizontal">) => {
                        if (cartBooks.length === 0) return;

                        setSnackbarState({
                                ...position,
                                open: true,
                        });
                        setCartBooks([]);
                },
                [cartBooks]
        );

        const updateCart = useCallback((book: Book, quantity: number) => {
                if (quantity <= 0) return;

                setCartBooks((prevBooks) => {
                        const existingBookIndex = prevBooks.findIndex(
                                (item) => item.book.isbn === book.isbn
                        );

                        const bookPrice = extractNumericPrice(book.price);
                        const newQuantity =
                                existingBookIndex >= 0
                                        ? prevBooks[existingBookIndex]
                                                  .quantity + quantity
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

        useEffect(() => {
                updateTotal();
        }, [cartBooks, updateTotal]);

        return (
                <ContentContainer>
                        <Header
                                cartBooks={cartBooks}
                                total={total}
                                onOpenCompras={() => setIsComprasOpen(true)}
                                userState={userState}
                                onUserStateChange={setUserState}
                                onCheckout={handleCheckout}
                        />
                        <Compras
                                open={isComprasOpen}
                                onClose={() => setIsComprasOpen(false)}
                                books={INITIAL_BOOKS}
                        />
                        <BookGrid onUpdateCart={updateCart} />
                        <CheckoutPopup
                                userState={userState}
                                onClose={() =>
                                        setSnackbarState((prev) => ({
                                                ...prev,
                                                open: false,
                                        }))
                                }
                                open={snackbarState.open}
                                vertical={snackbarState.vertical}
                                horizontal={snackbarState.horizontal}
                        />
                </ContentContainer>
        );
}
