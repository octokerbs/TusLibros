"use client";

import { AppBar, IconButton, Tooltip, Badge } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import React from "react";
import Title from "./Title";
import CartMenu from "./CartMenu";
import UserMenu from "./UserMenu";
import { useHeaderLogic } from "./hooks/useHeaderLogic";
import { useUserIcon } from "./hooks/useUserIcon";
import { CartButton, HeaderBox } from "./styles";
import { Book, SnackbarState, UserState } from "../types";

export default function Header({
        cart,
        catalog,
        onOpenCompras,
        userState,
        onUserStateChange,
        onCheckout,
}: {
        cart: Record<string, number>;
        catalog: Record<string, Book>;
        onOpenCompras: () => void;
        userState: UserState;
        onUserStateChange: (newState: UserState) => void;
        onCheckout: (
                position: Pick<SnackbarState, "vertical" | "horizontal">
        ) => void;
        cartID: number;
}) {
        const { anchorElCart, anchorElUser, handleClick, handleClose } =
                useHeaderLogic();
        const userIcon = useUserIcon(userState);

        return (
                <AppBar position="fixed" sx={{ bgcolor: "#567568" }}>
                        <HeaderBox>
                                <Title />

                                <Tooltip title="List cart">
                                        <CartButton
                                                onClick={handleClick("cart")}
                                                aria-controls={
                                                        anchorElCart
                                                                ? "cart-menu"
                                                                : undefined
                                                }
                                                aria-haspopup="true"
                                                aria-expanded={Boolean(
                                                        anchorElCart
                                                )}
                                        >
                                                <Badge
                                                        badgeContent={
                                                                Object.keys(
                                                                        cart
                                                                ).length
                                                        }
                                                        color="error"
                                                >
                                                        <ShoppingCart />
                                                </Badge>
                                        </CartButton>
                                </Tooltip>

                                <Tooltip title="Account settings">
                                        <IconButton
                                                onClick={handleClick("user")}
                                                aria-controls={
                                                        anchorElUser
                                                                ? "user-menu"
                                                                : undefined
                                                }
                                                aria-haspopup="true"
                                                aria-expanded={Boolean(
                                                        anchorElUser
                                                )}
                                                sx={{ color: "white" }}
                                        >
                                                {userIcon}
                                        </IconButton>
                                </Tooltip>
                        </HeaderBox>

                        <CartMenu
                                anchorEl={anchorElCart}
                                catalog={catalog}
                                open={Boolean(anchorElCart)}
                                handleClose={handleClose("cart")}
                                cart={cart}
                                onCheckout={onCheckout}
                        />

                        <UserMenu
                                anchorEl={anchorElUser}
                                open={Boolean(anchorElUser)}
                                handleClose={handleClose("user")}
                                onUserStateChange={onUserStateChange}
                                onOpenCompras={onOpenCompras}
                        />
                </AppBar>
        );
}
