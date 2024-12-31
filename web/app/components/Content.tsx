"use client";

import { useState, useCallback } from "react";
import BookGrid from "./grid/Grid";
import Header from "./header/Header";
import Compras from "./Compras";
import CheckoutPopup from "./CheckoutPopup";
import { INITIAL_BOOKS } from "./data/books";
import { UserState } from "./types";
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

    const handleCheckout = useCallback(() => {
        if (cartBooks.length === 0) return;

        openSnackbar();
        clearCart();
    }, [cartBooks, openSnackbar, clearCart]);

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
            <BookGrid onUpdateCart={addToCart} books={INITIAL_BOOKS} />
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
