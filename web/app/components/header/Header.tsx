"use client";

import { AppBar, IconButton, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import { ShoppingCart } from "@mui/icons-material";
import React from "react";
import Title from "./Title";
import CartMenu from "./CartMenu";
import UserMenu from "./UserMenu";
import { CartBookEntry, SnackbarState, UserState } from "../../types";
import Badge from "@mui/material/Badge";

import useUserIcon from "./hooks/useUserIcon";

export default function Header({
        cartBooks,
        total,
        onOpenCompras,
        userState,
        onUserStateChange,
        onCheckout,
}: {
        cartBooks: CartBookEntry[];
        total: string;
        onOpenCompras: () => void;
        userState: UserState;
        onUserStateChange: (newState: UserState) => void;
        onCheckout: (
                position: Pick<SnackbarState, "vertical" | "horizontal">
        ) => void;
}) {
        const [anchorElUser, setAnchorElUser] =
                React.useState<null | HTMLElement>(null);
        const [anchorElCart, setAnchorElCart] =
                React.useState<null | HTMLElement>(null);

        const openUser = Boolean(anchorElUser);
        const openCart = Boolean(anchorElCart);

        const handleClickUser = (event: React.MouseEvent<HTMLElement>) => {
                setAnchorElUser(event.currentTarget);
        };
        const handleCloseUser = () => {
                setAnchorElUser(null);
        };

        const handleClickCart = (event: React.MouseEvent<HTMLElement>) => {
                setAnchorElCart(event.currentTarget);
        };
        const handleCloseCart = () => {
                setAnchorElCart(null);
        };

        const userIcon = useUserIcon(userState);

        return (
                <AppBar position="fixed" sx={{ bgcolor: "#567568" }}>
                        <Box
                                sx={{
                                        height: "6vh",
                                        marginLeft: "20vw",
                                        marginRight: "20vw",
                                        display: "flex",
                                        alignItems: "center",
                                }}
                        >
                                <Title />

                                <Tooltip title="List cart">
                                        <IconButton
                                                onClick={handleClickCart}
                                                aria-controls={
                                                        openCart
                                                                ? "account-menu"
                                                                : undefined
                                                }
                                                aria-haspopup="true"
                                                aria-expanded={
                                                        openCart
                                                                ? "true"
                                                                : undefined
                                                }
                                                sx={{
                                                        marginLeft: "auto",
                                                        marginRight: "1vw",
                                                        color: "white",
                                                }}
                                        >
                                                <Badge
                                                        badgeContent={
                                                                cartBooks.length
                                                        }
                                                        color="error"
                                                >
                                                        <ShoppingCart />
                                                </Badge>
                                        </IconButton>
                                </Tooltip>
                                <Tooltip title="Account settings">
                                        <IconButton
                                                onClick={handleClickUser}
                                                aria-controls={
                                                        openUser
                                                                ? "account-menu"
                                                                : undefined
                                                }
                                                aria-haspopup="true"
                                                aria-expanded={
                                                        openUser
                                                                ? "true"
                                                                : undefined
                                                }
                                                sx={{ color: "white" }}
                                        >
                                                {userIcon}
                                        </IconButton>
                                </Tooltip>
                        </Box>

                        <CartMenu
                                anchorEl={anchorElCart}
                                open={openCart}
                                handleClose={handleCloseCart}
                                cartBooks={cartBooks}
                                total={total}
                                onCheckout={onCheckout}
                        />

                        <UserMenu
                                anchorEl={anchorElUser}
                                open={openUser}
                                handleClose={handleCloseUser}
                                onUserStateChange={onUserStateChange}
                                onOpenCompras={onOpenCompras}
                        />
                </AppBar>
        );
}
