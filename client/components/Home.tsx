"use client";

import {useEffect, useState} from "react";
import Header from "./Header";
import BookGrid from "./BookGrid";
import useCatalog from "../hooks/useCatalog";
import Purchases from "./Purchases";
import Notification from "./Notification";
import {Box, styled} from "@mui/material";
import {useNotification} from "@/context/NotificationContext";
import {useUser2} from "@/context/UserContext";
import {UserState} from "@/types/user";

const HomeContainer = styled(Box)(({}) => ({
    backgroundColor: "#F3FCF0",
    width: "100vw",
    height: "100vh",
    overflow: "auto",
}));

export default function Home() {
    const notification = useNotification();
    const user = useUser2();

    const [isComprasOpen, setIsComprasOpen] = useState(false);
    const {catalog, requestCatalog} = useCatalog(notification.handleError);

    useEffect(() => {
        requestCatalog();
        user.handleNewUserState(UserState.ValidUser)
        user.handleNewCartID(user.user.clientId, user.user.password)
    }, [requestCatalog]);

    return (
        <HomeContainer>
            <Header
                catalog={catalog}
                onOpenCompras={async () => {
                    setIsComprasOpen(true);
                    await user.handleListPurchases();
                }}
            />
            <Purchases
                open={isComprasOpen}
                onClose={() => setIsComprasOpen(false)}
                catalog={catalog}
            />
            <BookGrid
                catalog={catalog}
            />
            <Notification/>
        </HomeContainer>
    );
}
