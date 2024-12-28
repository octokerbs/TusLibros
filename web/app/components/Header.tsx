"use client";

import { AppBar, IconButton, SnackbarOrigin, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import { AccountCircle, ShoppingCart } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import Title from "./Title";
import CartMenu from "./Cart";
import UserMenu from "./User";
import { CartBookEntry, UserState } from "./Content";
import Badge from "@mui/material/Badge";
import NoAccounts from "@mui/icons-material/NoAccounts";
import EventBusy from "@mui/icons-material/EventBusy";
import CreditCardOff from "@mui/icons-material/CreditCardOff";

export default function Header({
        cartBooks,
        total,
        handleOpenCompras,
        userState,
        handleUserState,
        handleClick,
}: {
        cartBooks: CartBookEntry[];
        total: string;
        handleOpenCompras: () => void;
        userState: UserState;
        handleUserState: (newState: UserState) => void;
        handleClick: (newState: SnackbarOrigin) => () => void;
}) {
        const [anchorElUser, setAnchorElUser] =
                React.useState<null | HTMLElement>(null);
        const [anchorElCart, setAnchorElCart] =
                React.useState<null | HTMLElement>(null);

        const [userIcon, setUserIcon] = useState(<AccountCircle />);

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

        useEffect(() => {
                switch (userState) {
                        case UserState.ValidUser: {
                                setUserIcon(<AccountCircle />);
                                break;
                        }
                        case UserState.InvalidUser: {
                                setUserIcon(<NoAccounts />);
                                break;
                        }
                        case UserState.ExpiredCreditCardUser: {
                                setUserIcon(<EventBusy />);
                                break;
                        }
                        case UserState.NoFundsCreditCardUser: {
                                setUserIcon(<CreditCardOff />);
                                break;
                        }
                }
        }, [userState]);

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
                                handleClick={handleClick}
                        />

                        <UserMenu
                                anchorEl={anchorElUser}
                                open={openUser}
                                handleClose={handleCloseUser}
                                handleUserState={handleUserState}
                                handleOpenCompras={handleOpenCompras}
                        />
                </AppBar>
        );
}
