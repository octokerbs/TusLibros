"use client";

import { useState, useCallback, useEffect } from "react";
import BookGrid from "./grid/Grid";
import Header from "./header/Header";
import Compras from "./Compras";
import CheckoutPopup from "./CheckoutPopup";
import { fetchBooks } from "./data/books";
import { Book, UserState } from "./types";
import { ContentContainer } from "./styles";
import useCart from "./hooks/useCart";
import useSnackbar from "./hooks/useSnackbar";

export default function Content() {
        const { cartBooks, addToCart, clearCart, total } = useCart();
        const { snackbarState, openSnackbar, closeSnackbar } = useSnackbar(
                "top",
                "right"
        );
        const [userState, setUserState] = useState(UserState.ValidUser);
        const [isComprasOpen, setIsComprasOpen] = useState(false);
        const [catalog, setCatalog] = useState<Record<string, Book>>({});

        const handleCheckout = useCallback(() => {
                if (cartBooks.length === 0) return;

                openSnackbar();
                clearCart();
        }, [cartBooks, openSnackbar, clearCart]);

        useEffect(() => {
                async function loadBooks() {
                        try {
                                const fetchedBooks = await fetchBooks();
                                setCatalog(fetchedBooks);
                        } catch (error) {
                                console.error("Failed to load books:", error);
                        }
                }
                loadBooks();
        }, []);

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
                                catalog={catalog}
                        />
                        <BookGrid onUpdateCart={addToCart} catalog={catalog} />
                        <CheckoutPopup
                                userState={userState}
                                onClose={closeSnackbar}
                                open={snackbarState.open}
                                vertical={snackbarState.vertical}
                                horizontal={snackbarState.horizontal}
                        />
                </ContentContainer>
        );
}
