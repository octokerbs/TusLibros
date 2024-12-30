import { RemoveCircleOutline } from "@mui/icons-material";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import { Box, Divider, IconButton, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Book } from "../../types";

export default function BookCard({
        onUpdateCart,
        book,
}: {
        onUpdateCart: (book: Book, quantity: number) => void;
        book: Book;
}) {
        const [counter, setCounter] = useState(1);

        const handleIncrement = () => {
                setCounter(counter + 1);
        };

        const handleDecrement = () => {
                if (counter == 1) {
                        return;
                }

                setCounter(counter - 1);
        };

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
                                        {book.price}
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
                                        <Button
                                                sx={{
                                                        color: "white",
                                                        bgcolor: "#567568",
                                                        alignItems: "center",
                                                        marginLeft: "auto",
                                                }}
                                                onClick={() => {
                                                        onUpdateCart(
                                                                book,
                                                                counter
                                                        );
                                                        setCounter(1);
                                                }}
                                        >
                                                <AddShoppingCart></AddShoppingCart>
                                        </Button>
                                </Tooltip>
                        </CardActions>
                </Card>
        );
}
