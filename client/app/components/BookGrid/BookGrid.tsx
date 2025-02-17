"use client";

import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";
import BookCard from "./BookCard";
import { Book } from "../../../types/cart";
import { GridBox } from "./styles";

export default function BookGrid({
        catalog,
        onAddToCart,
}: {
        catalog: Record<string, Book>;
        onAddToCart: (
                isbn: string,
                counter: number,
                restartCounter: () => void
        ) => Promise<void>;
}) {
        return (
                <Box sx={{ width: "100vw" }}>
                        <GridBox>
                                <Grid2 container spacing={"1.2vw"}>
                                        {Object.values(catalog).map((book) => (
                                                <BookCard
                                                        key={book.isbn}
                                                        book={book}
                                                        onAddToCart={
                                                                onAddToCart
                                                        }
                                                ></BookCard>
                                        ))}
                                </Grid2>
                        </GridBox>
                </Box>
        );
}
