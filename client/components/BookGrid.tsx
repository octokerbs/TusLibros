"use client";

import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";
import BookCard from "./BookCard";
import {styled} from "@mui/material";
import {Book} from "@/utils/book";

const GridBox = styled(Box)(({}) => ({
    marginTop: "8vh",
    marginBottom: "2vh",
    marginLeft: "20vw",
    marginRight: "20vw",
}));

export default function BookGrid({catalog,}: { catalog: Record<string, Book>; }) {
    if (!catalog || Object.keys(catalog).length === 0) {
        return null;
    }

    return (
        <Box sx={{width: "100vw"}}>
            <GridBox>
                <Grid2 container spacing={"1.2vw"}>
                    {Object.values(catalog).map((book) => (
                        <BookCard
                            key={book.isbn}
                            book={book}
                        ></BookCard>
                    ))}
                </Grid2>
            </GridBox>
        </Box>
    );
}
