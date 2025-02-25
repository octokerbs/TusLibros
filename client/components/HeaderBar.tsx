"use client";

import {AppBar, IconButton, Tooltip, Badge, useTheme, styled, Box} from "@mui/material";
import {ShoppingCart} from "@mui/icons-material";
import React from "react";
import CartMenu from "./CartMenu";
import {useMenus} from "@/hooks/useMenus";
import UserMenu from "./UserMenu";
import {useUser} from "@/context/UserContext";
import {useCart} from "@/context/CartContext";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import {Book} from "@/utils/book";
import {LocalUserStateTraits} from "@/utils/user";

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

export default function HeaderBar({catalog, onOpenPurchases}: {
    catalog: Record<string, Book>;
    onOpenPurchases: () => void;
}) {
    const theme = useTheme();
    const user = useUser();
    const cart = useCart();

    const {anchorElCart, anchorElUser, handleClick, handleClose} = useMenus();

    return (
        <AppBar
            position="fixed"
            sx={{bgcolor: theme.palette.primary.main}}
        >
            <HeaderBox>
                <Link
                    href="https://github.com/KerbsOD/TusLibros"
                    target="_blank"
                >
                    <Button>
                        <Typography
                            variant="h5"
                            fontFamily="Poppins, sans-serif"
                            fontWeight="bold"
                            color="white"
                            component="div"
                        >
                            TusLibros
                        </Typography>
                    </Button>
                </Link>
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
                                Object.keys(cart.items).length
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
                        {LocalUserStateTraits[user.state()].logo}
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
                onOpenPurchases={onOpenPurchases}
            />
        </AppBar>
    );
}
