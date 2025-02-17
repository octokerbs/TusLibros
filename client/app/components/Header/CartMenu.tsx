import { ShoppingCartCheckout } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import {
        CartMenuItem,
        CartMenuTotal,
        CheckoutBox,
        CheckoutButton,
        SlotPropsCart,
} from "./styles";
import { Book } from "../../../types/cart";
import { SnackbarState } from "../../../types/user";
import { formatCurrency } from "../../../utils/formatters";
import { calculateTotal } from "../../../utils/price";
import { forEachBook } from "../../../utils/book";

export default function CartMenu({
        anchorEl,
        catalog,
        open,
        handleClose,
        cart,
        onCheckout,
}: {
        anchorEl: HTMLElement | null;
        catalog: Record<string, Book>;
        open: boolean;
        handleClose: () => void;
        cart: Record<string, number>;
        onCheckout: (
                position: Pick<SnackbarState, "vertical" | "horizontal">
        ) => void;
}) {
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
                                {forEachBook(catalog, cart, (book: Book, quantity: number) => {
                                        return (
                                                <Box key={book.isbn}>
                                                        <CartMenuItem>
                                                                <Typography
                                                                        gutterBottom
                                                                        variant="inherit"
                                                                        component="div"
                                                                        noWrap
                                                                >
                                                                        {book.name}{" "}
                                                                        <Box
                                                                                component="span"
                                                                                fontWeight="fontWeightBold"
                                                                        >
                                                                                x{quantity}
                                                                        </Box>
                                                                </Typography>
                                                                <Typography
                                                                        gutterBottom
                                                                        variant="inherit"
                                                                        component="div"
                                                                        noWrap
                                                                >
                                                                        {formatCurrency(book.price * quantity)}
                                                                </Typography>
                                                        </CartMenuItem>
                                                        <Divider />
                                                </Box>
                                        );
                                })}
                        </Box>

                        <CartMenuTotal>
                                <Typography gutterBottom variant="h6" component="div">
                                        Total
                                </Typography>
                                <Typography gutterBottom variant="h6" component="div">
                                        {formatCurrency(calculateTotal(cart, catalog))}
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
                                        <Typography sx={{ color: "white" }} component="div">
                                                Checkout
                                        </Typography>
                                </CheckoutButton>
                        </CheckoutBox>
                </Menu>
        );
}
