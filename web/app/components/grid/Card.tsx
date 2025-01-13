import { RemoveCircleOutline } from "@mui/icons-material";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import { Box, Divider, IconButton, Tooltip } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { BookCardProps } from "./types";
import { AddToCartButton } from "./styles";
import { useCounter } from "./hooks/useCounter";
import { formatCurrency } from "../utils/price";

export default function BookCard({ onUpdateCart, book }: BookCardProps) {
        const { counter, handleIncrement, handleDecrement, restartCounter } =
                useCounter();

        return (
                <Card sx={{ width: "11vw" }}>
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
                                        <Typography>{counter}</Typography>
                                        <IconButton onClick={handleIncrement}>
                                                <AddCircleOutline></AddCircleOutline>
                                        </IconButton>
                                </Box>
                                <Tooltip title="Add to cart">
                                        <AddToCartButton
                                                onClick={() => {
                                                        onUpdateCart(
                                                                book,
                                                                counter
                                                        );
                                                        restartCounter();
                                                }}
                                        >
                                                <AddShoppingCart></AddShoppingCart>
                                        </AddToCartButton>
                                </Tooltip>
                        </CardActions>
                </Card>
        );
}
