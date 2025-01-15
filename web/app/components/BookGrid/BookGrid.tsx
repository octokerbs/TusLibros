"use client";

import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";
import BookCard from "./BookCard";
import { Book } from "../Types/cart";
import { GridBox } from "./styles";
import { User } from "../Types/user";

export default function BookGrid({
        user,
        catalog,
        onAddToCart,
}: {
        user: User;
        catalog: Record<string, Book>;
        onAddToCart: () => Promise<void>;
}) {
        return (
                <Box sx={{ width: "100vw" }}>
                        <GridBox>
                                <Grid2 container spacing={"1.2vw"}>
                                        {Object.values(catalog).map((book) => (
                                                <BookCard
                                                        user={user}
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
