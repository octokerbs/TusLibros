"use client";

import {AppBar, IconButton, Tooltip, Badge, useTheme, styled, Box} from "@mui/material";
import {ShoppingCart} from "@mui/icons-material";
import React from "react";
import CartMenu from "./CartMenu";
import {Book} from "@/types/cart";
import {useMenus} from "@/hooks/useMenus";
import Title from "./Title";
import UserMenu from "./UserMenu";
import {useUser2} from "@/context/UserContext";
import {useCart} from "@/context/CartContext";

const HeaderBox = styled(Box)(({}) => ({
    height: "6vh",
    marginLeft: "20vw",
    marginRight: "20vw",
    display: "flex",
    alignItems: "center",
}));

const CartButton = styled(IconButton)(({}) => ({
    marginLeft: "auto",
    marginRight: "1vw",
    color: "white",
}));

export default function Header({catalog, onOpenCompras}: {
    catalog: Record<string, Book>;
    onOpenCompras: () => void;
}) {
    const theme = useTheme();
    const {anchorElCart, anchorElUser, handleClick, handleClose} =
        useMenus();
    const user2 = useUser2();
    const cart2 = useCart();

    return (
        <AppBar
            position="fixed"
            sx={{bgcolor: theme.palette.primary.main}}
        >
            <HeaderBox>
                <Title/>
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
                                    cart2.cart
                                ).length
                            }
                            color="error"
                        >
                            <ShoppingCart/>
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
                        sx={{color: "white"}}
                    >
                        {user2.user.logo}
                    </IconButton>
                </Tooltip>
            </HeaderBox>
            <CartMenu
                anchorEl={anchorElCart}
                catalog={catalog}
                open={Boolean(anchorElCart)}
                handleClose={handleClose("cart")}
            />
            <UserMenu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                handleClose={handleClose("user")}
                onOpenCompras={onOpenCompras}
            />
        </AppBar>
    );
}
