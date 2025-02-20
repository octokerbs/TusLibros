"use client";

import { useState, useEffect, JSX } from "react";
import Header from "./Header";
import BookGrid from "./BookGrid";
import useCatalog from "../hooks/useCatalog";
import Compras from "./Compras";
import CheckoutPopup from "./CheckoutPopup";
import { SnackbarState, UserState } from "../types/user";
import { Box, styled } from "@mui/material";
import { useCart } from "@/contexts/CartContext";
import { useUser } from "@/contexts/UserContext";

const ContentContainer = styled(Box)(({}) => ({
        backgroundColor: "#F3FCF0",
        width: "100vw",
        height: "100vh",
        overflow: "auto",
}));

export default function Content({
        onHandleError,
        alert,
        snackbarState,
        onCloseSnackbar,
}: {
        onHandleError: (error: unknown) => void;
        alert: JSX.Element;
        snackbarState: SnackbarState;
        onCloseSnackbar: () => void;
}) {
        const { user, updateUserState } = useUser();
        const {
                cart,
                purchases,
                handleListPurchases,
                finishTransaction,
                handleAddToCart,
        } = useCart();
        const [isComprasOpen, setIsComprasOpen] = useState(false);
        const { catalog, requestCatalog } = useCatalog(onHandleError);

        useEffect(() => {
                requestCatalog();
                updateUserState(UserState.ValidUser);
        }, [requestCatalog, updateUserState]);

        return (
                <ContentContainer>
                        <Header
                                cart={cart}
                                catalog={catalog}
                                onOpenCompras={() => {
                                        setIsComprasOpen(true);
                                        handleListPurchases();
                                }}
                                user={user}
                                onUserStateChange={updateUserState}
                                onCheckout={finishTransaction}
                        />
                        <Compras
                                purchases={purchases}
                                open={isComprasOpen}
                                onClose={() => setIsComprasOpen(false)}
                                catalog={catalog}
                        />
                        <BookGrid
                                catalog={catalog}
                                onAddToCart={handleAddToCart}
                        />
                        <CheckoutPopup
                                alert={alert}
                                closeSnackbar={onCloseSnackbar}
                                open={snackbarState.open}
                                vertical={snackbarState.vertical}
                                horizontal={snackbarState.horizontal}
                        />
                </ContentContainer>
        );
}
