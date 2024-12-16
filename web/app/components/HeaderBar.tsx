"use client";

import {
    AppBar,
    Avatar,
    Button,
    Divider,
    IconButton,
    Link,
    ListItemIcon,
    Menu,
    MenuItem,
    Tooltip,
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
    AccountCircle,
    History,
    Logout,
    ShoppingCart,
} from "@mui/icons-material";
import React from "react";

export default function Header() {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );
    const [anchorElCart, setAnchorElCart] = React.useState<null | HTMLElement>(
        null
    );

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
                        >
                            TusLibros
                        </Typography>
                    </Button>
                </Link>

                <Tooltip title="List cart">
                    <IconButton
                        onClick={handleClickCart}
                        aria-controls={openCart ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={openCart ? "true" : undefined}
                        sx={{
                            marginLeft: "auto",
                            marginRight: "1vw",
                            color: "white",
                        }}
                    >
                        <ShoppingCart />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClickUser}
                        aria-controls={openUser ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={openUser ? "true" : undefined}
                        sx={{ marginRight: "1vw", color: "white" }}
                    >
                        <AccountCircle />
                    </IconButton>
                </Tooltip>
            </Box>

            <Menu
                anchorEl={anchorElCart}
                id="cart-menu"
                open={openCart}
                onClose={handleCloseCart}
                onClick={handleCloseCart}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            "&::before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem onClick={handleCloseCart}>
                    <Typography sx={{ width: 380 }} noWrap>
                        Productooooooooooooooooooooooooooooooooooo0000000000000000000000000
                    </Typography>
                </MenuItem>

                <Divider />

                <MenuItem onClick={handleCloseCart}>
                    <Typography sx={{ width: 380 }} noWrap>
                        Productooooooooooooooooooooooooooooooooooo0000000000000000000000000
                    </Typography>
                </MenuItem>
            </Menu>

            <Menu
                anchorEl={anchorElUser}
                id="account-menu"
                open={openUser}
                onClose={handleCloseUser}
                onClick={handleCloseUser}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            "&::before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem onClick={handleCloseUser}>
                    <ListItemIcon>
                        <History fontSize="small" />
                    </ListItemIcon>
                    Mis compras
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleCloseUser}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </AppBar>
    );
}
