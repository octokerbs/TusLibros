"use client";

import { AppBar, IconButton, Tooltip, Badge } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import React from "react";
import Title from "./Title";
import CartMenu from "./CartMenu";
import UserMenu from "./UserMenu";
import { useHeaderLogic } from "./hooks/useHeaderLogic";
import { useUserIcon } from "./hooks/useUserIcon";
import { HeaderProps } from "./types";
import { CartButton, HeaderBox } from "./styles";

export default function Header({
        cartBooks,
        total,
        onOpenCompras,
        userState,
        onUserStateChange,
        onCheckout,
}: HeaderProps) {
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
                                                                cartBooks.length
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
                                open={Boolean(anchorElCart)}
                                handleClose={handleClose("cart")}
                                cartBooks={cartBooks}
                                total={total}
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
