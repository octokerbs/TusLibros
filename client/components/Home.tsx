"use client";

import {useEffect} from "react";
import HeaderBar from "./HeaderBar";
import BookGrid from "./BookGrid";
import useCatalog from "../hooks/useCatalog";
import PurchasesWindow from "./PurchasesWindow";
import NotificationDisplay from "./NotificationDisplay";
import {Box, styled} from "@mui/material";
import {useUser} from "@/context/UserContext";
import {UserState} from "@/types/user";
import {usePurchases} from "@/hooks/usePurchases";

const HomeContainer = styled(Box)(({}) => ({
    backgroundColor: "#F3FCF0",
    width: "100vw",
    height: "100vh",
    overflow: "auto",
}));

export default function Home() {
    const user = useUser();
    const {catalog, requestCatalog} = useCatalog();
    const {isPurchasesOpen, handleOpenPurchases, handleClosePurchases} = usePurchases();

    // We only want to fetch the catalog and set a default user state once.
    useEffect(() => {
        requestCatalog();
        user.handleNewUserState(UserState.ValidUser);
    }, []); // LEAVE EMPTY, DO NOT TRUST ESLINT

    return (
        <HomeContainer>
            <HeaderBar catalog={catalog} onOpenPurchases={handleOpenPurchases}/>
            <PurchasesWindow catalog={catalog} open={isPurchasesOpen} onClose={handleClosePurchases}/>
            <BookGrid catalog={catalog}/>
            <NotificationDisplay/>
        </HomeContainer>
    );
}
