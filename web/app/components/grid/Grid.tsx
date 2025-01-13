"use client";

import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";
import BookCard from "./Card";
import { Book } from "../types";
import { GridBox } from "./styles";

export default function BookGrid({
        onUpdateCart,
        catalog,
}: {
        onUpdateCart: (book: Book, quantity: number) => void;
        catalog: Record<string, Book>;
}) {
        return (
                <Box sx={{ width: "100vw" }}>
                        <GridBox>
                                <Grid2 container spacing={"1.2vw"}>
                                        {Object.values(catalog).map((book) => (
                                                <BookCard
                                                        key={book.isbn}
                                                        onUpdateCart={
                                                                onUpdateCart
                                                        }
                                                        book={book}
                                                ></BookCard>
                                        ))}
                                </Grid2>
                        </GridBox>
                </Box>
        );
}
