"use client";

import { useState, useEffect, useCallback } from "react";
import { ContentContainer } from "./styles";
import useSnackbar from "./useSnackbar";
import Header from "../Header/Header";
import BookGrid from "../BookGrid/BookGrid";
import useCatalog from "./useCatalog";
import { Compras } from "../Compras";
import { CheckoutPopup } from "../CheckoutPopup";
import useUser from "./useUser";
import { useAlert } from "./useAlert";
import { UserState } from "../Types/user";

export default function Content() {
        const { snackbarState, openSnackbar, closeSnackbar } = useSnackbar(
                "top",
                "right"
        );
        const { alert, updateAlert } = useAlert(closeSnackbar);

        const handleError = useCallback(
                (error: unknown) => {
                        updateAlert("error", error as string);
                        openSnackbar();
                },
                [openSnackbar, updateAlert]
        );

        const [isComprasOpen, setIsComprasOpen] = useState(false);
        const { catalog, requestCatalog } = useCatalog(handleError);
        const {
                updateUserState,
                cart,
                requestUserPurchases,
                user,
                handleCheckout,
                purchases,
                requestAddToCart,
        } = useUser(updateAlert, openSnackbar, handleError);

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
                                catalog={catalog}
                                onAddToCart={requestAddToCart}
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
