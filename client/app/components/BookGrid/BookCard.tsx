import { RemoveCircleOutline } from "@mui/icons-material";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import { Box, Divider, IconButton, Tooltip, useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useCounter } from "./useCounter";
import { Book } from "../../../types/cart";
import { AddToCartButton } from "./styles";
import { formatCurrency } from "../../../utils/formatters";

export default function BookCard({
        book,
        onAddToCart,
}: {
        book: Book;
        onAddToCart: (
                isbn: string,
                counter: number,
                restartCounter: () => void
        ) => Promise<void>;
}) {
        const { counter, handleIncrement, handleDecrement, restartCounter } =
                useCounter();

        const theme = useTheme();

        return (
                <Card
                        sx={{
                                width: "11vw",
                                border: 1,
                                borderColor: theme.palette.primary.main,
                        }}
                >
                        <CardMedia
                                sx={{ height: "30vh" }}
                                image={book.imagePath}
                                title="Book Cover"
                        />
                        <CardContent>
                                <Typography
                                        variant="h6"
                                        component="div"
                                        sx={{
                                                overflow: "hidden",
                                                lineHeight: "1.5em",
                                                height: "3em",
                                        }}
                                >
                                        {book.name}
                                </Typography>

                                <Typography
                                        gutterBottom
                                        fontSize={14}
                                        component="div"
                                >
                                        ISBN: {book.isbn}
                                </Typography>

                                <Divider></Divider>
                        </CardContent>

                        <Box
                                sx={{
                                        display: "flex",
                                        marginLeft: "1vw",
                                }}
                        >
                                <Typography variant="h5" component="div">
                                        {formatCurrency(book.price)}
                                </Typography>
                        </Box>

                        <CardActions
                                sx={{
                                        justifyContent: "space-between",
                                }}
                        >
                                <Box
                                        sx={{
                                                display: "flex",
                                                alignItems: "center",
                                        }}
                                >
                                        <IconButton onClick={handleDecrement}>
                                                <RemoveCircleOutline></RemoveCircleOutline>
                                        </IconButton>
                                        <Typography component="div">
                                                {counter}
                                        </Typography>
                                        <IconButton onClick={handleIncrement}>
                                                <AddCircleOutline></AddCircleOutline>
                                        </IconButton>
                                </Box>
                                <Tooltip title="Add to cart">
                                        <AddToCartButton
                                                onClick={() =>
                                                        onAddToCart(
                                                                book.isbn,
                                                                counter,
                                                                restartCounter
                                                        )
                                                }
                                        >
                                                <AddShoppingCart />
                                        </AddToCartButton>
                                </Tooltip>
                        </CardActions>
                </Card>
        );
}
