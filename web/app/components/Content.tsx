"use client";

import { useState, useEffect } from "react";
import BookGrid from "./grid/Grid";
import Header from "./header/Header";
import Compras from "./Compras";
import CheckoutPopup from "./CheckoutPopup";
import {
        checkOutCart,
        getCatalog,
        getPurchases,
        listCart,
} from "./api/apiFunctions";
import { Book, UserState } from "./types";
import { ContentContainer } from "./styles";
import useSnackbar from "./hooks/useSnackbar";
import { createCart } from "./api/apiFunctions";

export default function Content() {
        const [userState, setUserState] = useState(UserState.ValidUser);
        const [cart, setCart] = useState<Record<string, number>>({});
        const [cartID, setCartID] = useState<number>(-1);
        const [catalog, setCatalog] = useState<Record<string, Book>>({});
        const { snackbarState, openSnackbar, closeSnackbar } = useSnackbar(
                "top",
                "right"
        );
        const [isComprasOpen, setIsComprasOpen] = useState(false);
        const [transactionID, setTransactionID] = useState<number>(-1);
        const [purchases, setPurchases] = useState<Record<string, number>>({});

        async function checkoutAndGetTransactionID() {
                try {
                        const newTransactionID = await checkOutCart(
                                cartID,
                                "1111222233334444",
                                new Date("2025-08-26T14:00:00Z")
                        );
                        setTransactionID(newTransactionID);
                } catch (error) {
                        console.error("Failed to checkout cart: ", error);
                }
        }

        async function getUserPurchases() {
                try {
                        const newPurchases = await getPurchases(
                                "Octo",
                                "Kerbs"
                        );
                        setPurchases(newPurchases);
                } catch (error) {
                        console.error("Failed to list purchases: ", error);
                }
        }

        async function initCart() {
                try {
                        const requestCartId = await createCart();
                        setCartID(requestCartId);
                } catch (error) {
                        console.error("Cart initialization failed:", error);
                }
        }

        const handleCheckout = () => {
                if (cart.length === 0) return;

                checkoutAndGetTransactionID();

                openSnackbar();
                setCart({});
                initCart();
        };

        useEffect(() => {
                async function initCatalog() {
                        try {
                                const fetchedBooks = await getCatalog();
                                setCatalog(fetchedBooks);
                        } catch (error) {
                                console.error(
                                        "Catalog initialization failed:",
                                        error
                                );
                        }
                }
                initCatalog();
                initCart();
        }, []);

        async function updateCart() {
                try {
                        const fetchCart = await listCart(cartID);
                        setCart(fetchCart);
                } catch (error) {
                        console.error("Cart fetch error: ", error);
                }
        }

        return (
                <ContentContainer>
                        <Header
                                cart={cart}
                                catalog={catalog}
                                onOpenCompras={() => {
                                        setIsComprasOpen(true);
                                        getUserPurchases();
                                }}
                                userState={userState}
                                onUserStateChange={setUserState}
                                onCheckout={handleCheckout}
                                cartID={cartID}
                        />
                        <Compras
                                purchases={purchases}
                                open={isComprasOpen}
                                onClose={() => setIsComprasOpen(false)}
                                catalog={catalog}
                        />
                        <BookGrid
                                catalog={catalog}
                                cartID={cartID}
                                updateCart={updateCart}
                        />
                        <CheckoutPopup
                                userState={userState}
                                transactionID={transactionID}
                                onClose={closeSnackbar}
                                open={snackbarState.open}
                                vertical={snackbarState.vertical}
                                horizontal={snackbarState.horizontal}
                        />
                </ContentContainer>
        );
}
