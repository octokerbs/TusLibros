"use client";

import { useState, useEffect } from "react";
import CheckoutPopup from "../CheckoutPopup";
import { ContentContainer } from "./styles";
import useSnackbar from "./useSnackbar";
import Header from "../Header/Header";
import Compras from "../Compras";
import BookGrid from "../BookGrid/BookGrid";
import { UserState } from "../Types/user";
import { Book } from "../Types/cart";
import { api } from "../utils/api";

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

        async function requestCatalog() {
                try {
                        const items = await api.catalog();
                        setCatalog(items);
                } catch (error) {
                        console.error("Catalog initialization failed:", error);
                }
        }

        async function requestCartID() {
                try {
                        const cartID = await api.createCart("Octo", "Kerbs");
                        setCartID(cartID);
                        setCart({});
                } catch (error) {
                        console.error("Cart initialization failed:", error);
                }
        }

        async function requestCheckout() {
                try {
                        const transactionID = await api.checkOutCart(
                                cartID,
                                "1111222233334444",
                                new Date("2025-08-26T14:00:00Z")
                        );
                        setTransactionID(transactionID);
                } catch (error) {
                        console.error("Failed to checkout cart: ", error);
                }
        }

        async function requestUserPurchases() {
                try {
                        const purchases = await api.listPurchases(
                                "Octo",
                                "Kerbs"
                        );
                        setPurchases(purchases);
                } catch (error) {
                        console.error("Failed to list purchases: ", error);
                }
        }

        async function requestCartItems() {
                try {
                        const items = await api.listCart(cartID);
                        setCart(items);
                } catch (error) {
                        console.error("Cart fetch error: ", error);
                }
        }

        const handleCheckout = async () => {
                if (Object.keys(cart).length === 0) return;

                await requestCheckout();
                await requestCartID();
                openSnackbar();
        };

        useEffect(() => {
                requestCatalog();
                requestCartID();
        }, []);

        return (
                <ContentContainer>
                        <Header
                                cart={cart}
                                catalog={catalog}
                                onOpenCompras={() => {
                                        setIsComprasOpen(true);
                                        requestUserPurchases();
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
                                updateCart={requestCartItems}
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
