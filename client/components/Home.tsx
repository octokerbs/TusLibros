"use client";

import {useState, useEffect} from "react";
import Header from "./Header";
import BookGrid from "./BookGrid";
import useCatalog from "../hooks/useCatalog";
import Compras from "./Compras";
import Notification from "./Notification";
import useUser from "../hooks/useUser";
import {UserState} from "@/types/user";
import {Box, styled} from "@mui/material";
import {useNotification} from "@/context/NotificationContext";

const ContentContainer = styled(Box)(({}) => ({
    backgroundColor: "#F3FCF0",
    width: "100vw",
    height: "100vh",
    overflow: "auto",
}));

export default function Home() {
    const notification = useNotification();

    const [isComprasOpen, setIsComprasOpen] = useState(false);
    const {catalog, requestCatalog} = useCatalog(notification.handleError);
    const {
        cart,
        user,
        purchases,
        updateUserState,
        handleListPurchases,
        finishTransaction,
        handleAddToCart,
    } = useUser(notification.handleSuccess, notification.handleError);

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
            <Notification/>
        </ContentContainer>
    );
}
