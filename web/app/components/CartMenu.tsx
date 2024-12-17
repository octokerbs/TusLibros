import { ShoppingCartCheckout } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import { CartBookEntry } from "../content";
import { useRouter } from "next/navigation";

export default function CartMenu({
    anchorEl,
    open,
    handleClose,
    cartBooks,
    total,
}: {
    anchorEl: HTMLElement | null;
    open: boolean;
    handleClose: () => void;
    cartBooks: CartBookEntry[];
    total: string;
}) {
    const router = useRouter();
    return (
        <Menu
            anchorEl={anchorEl}
            id="cart-menu"
            open={open}
            onClose={handleClose}
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
            <Box>
                {cartBooks.map((cartEntry) => (
                    <Box key={cartEntry.book.isbn}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginLeft: "1vw",
                                marginRight: "1vw",
                                width: "20vw",
                            }}
                        >
                            <Typography
                                gutterBottom
                                variant="inherit"
                                component="div"
                                noWrap
                            >
                                {cartEntry.book.name}{" "}
                                <Box
                                    component="span"
                                    fontWeight="fontWeightBold"
                                >
                                    x{cartEntry.quantity}
                                </Box>
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="inherit"
                                component="div"
                                noWrap
                            >
                                {cartEntry.total.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                })}
                            </Typography>
                        </Box>
                        <Divider />
                    </Box>
                ))}
            </Box>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginLeft: "1vw",
                    marginRight: "1vw",
                    width: "20vw",
                }}
            >
                <Typography gutterBottom variant="h6" component="div">
                    Total
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                    {total}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginLeft: "1vw",
                    marginRight: "1vw",
                    width: "20vw",
                }}
            >
                <Button
                    sx={{
                        alignItems: "center",
                        bgcolor: "#567568",
                        color: "white",
                        width: "20vw",
                    }}
                    onClick={() => router.push("/checkout")}
                >
                    <ShoppingCartCheckout></ShoppingCartCheckout>
                    <Typography sx={{ color: "white" }}>Checkout</Typography>
                </Button>
            </Box>
        </Menu>
    );
}
