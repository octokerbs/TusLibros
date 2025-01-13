"use client";

import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";
import BookCard from "./Card";
import { Book } from "../types";
import { GridBox } from "./styles";

export default function BookGrid({
        catalog,
        cartID,
}: {
        catalog: Record<string, Book>;
        cartID: number;
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
                                                ></BookCard>
                                        ))}
                                </Grid2>
                        </GridBox>
                </Box>
        );
}
