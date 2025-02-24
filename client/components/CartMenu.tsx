import {ShoppingCartCheckout} from "@mui/icons-material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import {Book} from "@/types/cart";
import {formatCurrency} from "@/utils/formatters";

import {calculateTotal} from "@/utils/price";
import {forEachBook} from "@/utils/book";
import {Button, styled} from "@mui/material";
import {useUser2} from "@/context/UserContext";
import {useCart} from "@/context/CartContext";

const CartMenuItem = styled(Box)(({}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: "1vw",
    marginRight: "1vw",
    width: "20vw",
}));

const CartMenuTotal = styled(Box)(({}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: "1vw",
    marginRight: "1vw",
    width: "20vw",
}));

const CheckoutBox = styled(Box)(({}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: "1vw",
    marginRight: "1vw",
    width: "20vw",
}));

const CheckoutButton = styled(Button)(({theme}) => ({
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    width: "20vw",
}));

const SlotPropsCart = {
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
};

export default function CartMenu({
                                     anchorEl,
                                     catalog,
                                     open,
                                     handleClose,
                                 }: {
    anchorEl: HTMLElement | null;
    catalog: Record<string, Book>;
    open: boolean;
    handleClose: () => void;
}) {
    const user = useUser2();
    const cart2 = useCart();

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
                {forEachBook(catalog, cart2.cart, (book: Book, quantity: number) => {
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
                            <Divider/>
                        </Box>
                    );
                })}
            </Box>
            <CartMenuTotal>
                <Typography gutterBottom variant="h6" component="div">
                    Total
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                    {formatCurrency(calculateTotal(cart2.cart, catalog))}
                </Typography>
            </CartMenuTotal>
            <CheckoutBox>
                <CheckoutButton
                    onClick={async () => {
                        await cart2.handleCheckoutCart(user.user.cartID, user.user.creditCardNumber, user.user.creditCardExpirationDate)
                        await user.handleNewCartID(user.user.clientId, user.user.password)
                        cart2.handleEmptyCart()
                    }}
                >
                    <ShoppingCartCheckout></ShoppingCartCheckout>
                    <Typography sx={{color: "white"}} component="div">
                        Checkout
                    </Typography>
                </CheckoutButton>
            </CheckoutBox>
        </Menu>
    );
}
