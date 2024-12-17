"use client";

import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";
import BookCard from "./BookCard";
import { Book, CartBookEntry } from "../content";

export default function BookGrid({
    updateCart,
}: {
    updateCart: (book: Book, quantity: number) => void;
}) {
    const book1: Book = {
        name: "Mistborn: Secret History",
        isbn: "978-1473225046",
        price: "$20,820",
        imagePath: "/images/SecretHistory.jpg",
    };

    const book2: Book = {
        name: "The Well Of Ascension",
        isbn: "978-0765316882",
        price: "$21,189",
        imagePath: "/images/TheWellOfAscension.jpg",
    };

    const book3: Book = {
        name: "Shadows",
        isbn: "978-0765378569",
        price: "$17,584",
        imagePath: "/images/ShadowsOfSelf.jpg",
    };

    return (
        <Box sx={{ width: "100vw" }}>
            <Box
                sx={{
                    marginTop: "4vw",
                    marginBottom: "2vw",
                    marginLeft: "20vw",
                    marginRight: "20vw",
                }}
            >
                <Grid2 container spacing={"1.2vw"}>
                    <BookCard updateCart={updateCart} book={book1}></BookCard>
                    <BookCard updateCart={updateCart} book={book2}></BookCard>
                    <BookCard updateCart={updateCart} book={book3}></BookCard>
                    <BookCard updateCart={updateCart} book={book1}></BookCard>
                    <BookCard updateCart={updateCart} book={book2}></BookCard>
                    <BookCard updateCart={updateCart} book={book3}></BookCard>
                    <BookCard updateCart={updateCart} book={book1}></BookCard>
                    <BookCard updateCart={updateCart} book={book2}></BookCard>
                    <BookCard updateCart={updateCart} book={book3}></BookCard>
                    <BookCard updateCart={updateCart} book={book1}></BookCard>
                    <BookCard updateCart={updateCart} book={book2}></BookCard>
                    <BookCard updateCart={updateCart} book={book3}></BookCard>
                    <BookCard updateCart={updateCart} book={book1}></BookCard>
                    <BookCard updateCart={updateCart} book={book2}></BookCard>
                    <BookCard updateCart={updateCart} book={book3}></BookCard>
                    <BookCard updateCart={updateCart} book={book1}></BookCard>
                    <BookCard updateCart={updateCart} book={book2}></BookCard>
                    <BookCard updateCart={updateCart} book={book3}></BookCard>
                    <BookCard updateCart={updateCart} book={book1}></BookCard>
                    <BookCard updateCart={updateCart} book={book2}></BookCard>
                    <BookCard updateCart={updateCart} book={book3}></BookCard>
                    <BookCard updateCart={updateCart} book={book1}></BookCard>
                    <BookCard updateCart={updateCart} book={book2}></BookCard>
                    <BookCard updateCart={updateCart} book={book3}></BookCard>
                </Grid2>
            </Box>
        </Box>
    );
}
