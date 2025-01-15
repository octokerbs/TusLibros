"use client";

import { useState, useEffect } from "react";
import { ContentContainer } from "./styles";
import useSnackbar from "./useSnackbar";
import Header from "../Header/Header";
import BookGrid from "../BookGrid/BookGrid";
import useCart from "./useCart";
import useCheckout from "./useCheckout";
import useCatalog from "./useCatalog";
import { Compras } from "../Compras";
import { CheckoutPopup } from "../CheckoutPopup";
import useUser from "./useUser";
import { useAlert } from "./useAlert";

export default function Content() {
        const { snackbarState, openSnackbar, closeSnackbar } = useSnackbar(
                "top",
                "right"
        );
        const { alert, updateAlert } = useAlert(closeSnackbar);
        const [isComprasOpen, setIsComprasOpen] = useState(false);
        const { catalog, requestCatalog } = useCatalog();
        const {
                user,
                purchases,
                requestUserPurchases,
                updateUserState,
                updateUserCartID,
        } = useUser();
        const { cart, requestCartID, requestCartItems } = useCart(
                user,
                updateUserCartID
        );
        const { handleCheckout } = useCheckout(
                user,
                cart,
                requestCartID,
                openSnackbar,
                updateAlert
        );
        useEffect(() => {
                requestCatalog();
                requestCartID();
        }, [requestCatalog, requestCartID]);

        return (
                <ContentContainer>
                        <Header
                                cart={cart}
                                catalog={catalog}
                                onOpenCompras={() => {
                                        setIsComprasOpen(true);
                                        requestUserPurchases();
                                }}
                                user={user}
                                onUserStateChange={updateUserState}
                                onCheckout={handleCheckout}
                        />
                        <Compras
                                purchases={purchases}
                                open={isComprasOpen}
                                onClose={() => setIsComprasOpen(false)}
                                catalog={catalog}
                        />
                        <BookGrid
                                user={user}
                                catalog={catalog}
                                onAddToCart={requestCartItems}
                        />
                        <CheckoutPopup
                                alert={alert}
                                open={snackbarState.open}
                                vertical={snackbarState.vertical}
                                horizontal={snackbarState.horizontal}
                        />
                </ContentContainer>
        );
}
