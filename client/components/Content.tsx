"use client";

import {useState, useEffect, useCallback} from "react";
import useSnackbar from "../hooks/useSnackbar";
import Header from "./Header";
import BookGrid from "./BookGrid";
import useCatalog from "../hooks/useCatalog";
import Compras from "./Compras";
import Notification from "./Notification";
import useUser from "../hooks/useUser";
import {useAlert} from "../hooks/useAlert";
import {UserState} from "../types/user";
import {Box, styled} from "@mui/material";

const ContentContainer = styled(Box)(({}) => ({
    backgroundColor: "#F3FCF0",
    width: "100vw",
    height: "100vh",
    overflow: "auto",
}));

export default function Content() {
    const {open, handleOpenNotificationBar, handleCloseNotificationBar} = useSnackbar();
    const {severity, message, color, handleSuccessAlert, handleErrorAlert} = useAlert();

    const handleSuccess = useCallback(
        (message: string) => {
            handleSuccessAlert(message);
            handleOpenNotificationBar();
        },
        [handleSuccessAlert, handleOpenNotificationBar]
    )

    const handleError = useCallback(
        (error: unknown) => {
            handleErrorAlert(error as string);
            handleOpenNotificationBar();
        },
        [handleErrorAlert, handleOpenNotificationBar]
    );

    const [isComprasOpen, setIsComprasOpen] = useState(false);
    const {catalog, requestCatalog} = useCatalog(handleError);
    const {
        cart,
        user,
        purchases,
        updateUserState,
        handleListPurchases,
        finishTransaction,
        handleAddToCart,
    } = useUser(handleSuccess, handleError);

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
            <Notification
                severity={severity}
                message={message}
                color={color}
                open={open}
                onCloseSnackbar={handleCloseNotificationBar}
            />
        </ContentContainer>
    );
}
