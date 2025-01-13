import { ShoppingCartCheckout } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import { CartProps } from "./types";
import {
        CartMenuItem,
        CartMenuTotal,
        CheckoutBox,
        CheckoutButton,
        SlotPropsCart,
} from "./styles";

export default function CartMenu({
        anchorEl,
        open,
        handleClose,
        cartBooks,
        total,
        onCheckout,
}: CartProps) {
        return (
                <Menu
                        anchorEl={anchorEl}
                        id="cart-menu"
                        open={open}
                        onClose={handleClose}
                        slotProps={SlotPropsCart}
                        transformOrigin={{
                                horizontal: "right",
                                vertical: "top",
                        }}
                        anchorOrigin={{
                                horizontal: "right",
                                vertical: "bottom",
                        }}
                >
                        <Box>
                                {cartBooks.map((cartEntry) => (
                                        <Box key={cartEntry.book.isbn}>
                                                <CartMenuItem>
                                                        <Typography
                                                                gutterBottom
                                                                variant="inherit"
                                                                component="div"
                                                                noWrap
                                                        >
                                                                {
                                                                        cartEntry
                                                                                .book
                                                                                .name
                                                                }{" "}
                                                                <Box
                                                                        component="span"
                                                                        fontWeight="fontWeightBold"
                                                                >
                                                                        x
                                                                        {
                                                                                cartEntry.quantity
                                                                        }
                                                                </Box>
                                                        </Typography>
                                                        <Typography
                                                                gutterBottom
                                                                variant="inherit"
                                                                component="div"
                                                                noWrap
                                                        >
                                                                {cartEntry.total.toLocaleString(
                                                                        "en-US",
                                                                        {
                                                                                style: "currency",
                                                                                currency: "USD",
                                                                        }
                                                                )}
                                                        </Typography>
                                                </CartMenuItem>
                                                <Divider />
                                        </Box>
                                ))}
                        </Box>

                        <CartMenuTotal>
                                <Typography
                                        gutterBottom
                                        variant="h6"
                                        component="div"
                                >
                                        Total
                                </Typography>
                                <Typography
                                        gutterBottom
                                        variant="h6"
                                        component="div"
                                >
                                        {total}
                                </Typography>
                        </CartMenuTotal>
                        <CheckoutBox>
                                <CheckoutButton
                                        onClick={() =>
                                                onCheckout({
                                                        vertical: "top",
                                                        horizontal: "right",
                                                })
                                        }
                                >
                                        <ShoppingCartCheckout></ShoppingCartCheckout>
                                        <Typography sx={{ color: "white" }}>
                                                Checkout
                                        </Typography>
                                </CheckoutButton>
                        </CheckoutBox>
                </Menu>
        );
}
