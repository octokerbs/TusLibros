"use client";

import { useState, useCallback, useEffect } from "react";
import BookGrid from "./grid/Grid";
import Header from "./header/Header";
import Compras from "./Compras";
import CheckoutPopup from "./CheckoutPopup";
import { fetchCatalog } from "./api/catalog";
import { Book, UserState } from "./types";
import { ContentContainer } from "./styles";
import useCart from "./hooks/useCart";
import useSnackbar from "./hooks/useSnackbar";
import { createCart } from "./api/cart";

export default function Content() {
        const { cartBooks, clearCart, total } = useCart();

        const [userState, setUserState] = useState(UserState.ValidUser);
        const [cartID, setCartID] = useState<number>(1);
        const [catalog, setCatalog] = useState<Record<string, Book>>({});
        const { snackbarState, openSnackbar, closeSnackbar } = useSnackbar(
                "top",
                "right"
        );
        const [isComprasOpen, setIsComprasOpen] = useState(false);

        const handleCheckout = useCallback(() => {
                if (cartBooks.length === 0) return;

                openSnackbar();
                clearCart();
        }, [cartBooks, openSnackbar, clearCart]);

        useEffect(() => {
                async function initCatalogAndCatalog() {
                        try {
                                const fetchedBooks = await fetchCatalog();
                                setCatalog(fetchedBooks);
                                const requestCartId = await createCart();
                                setCartID(requestCartId);
                        } catch (error) {
                                console.error(
                                        "Catalog or Cart initialization error:",
                                        error
                                );
                        }
                }
                initCatalogAndCatalog();
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
                                cartID={cartID}
                        />
                        <Compras
                                open={isComprasOpen}
                                onClose={() => setIsComprasOpen(false)}
                                catalog={catalog}
                        />
                        <BookGrid catalog={catalog} cartID={cartID} />
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
