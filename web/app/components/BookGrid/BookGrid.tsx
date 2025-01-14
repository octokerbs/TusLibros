"use client";

import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";
import BookCard from "./BookCard";
import { Book } from "../Types/cart";
import { GridBox } from "./styles";

export default function BookGrid({
        catalog,
        cartID,
        updateCart,
}: {
        catalog: Record<string, Book>;
        cartID: number;
        updateCart: () => void;
}) {
        console.log(cartID);
        return (
                <Box sx={{ width: "100vw" }}>
                        <GridBox>
                                <Grid2 container spacing={"1.2vw"}>
                                        {Object.values(catalog).map((book) => (
                                                <BookCard
                                                        key={book.isbn}
                                                        book={book}
                                                        cartID={cartID}
                                                        updateCart={updateCart}
                                                ></BookCard>
                                        ))}
                                </Grid2>
                        </GridBox>
                </Box>
        );
}
