"use client";

import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";
import BookCard from "./Card";
import { Book } from "../types";
import { GridBox } from "./styles";

export default function BookGrid({
    onUpdateCart,
    books,
}: {
    onUpdateCart: (book: Book, quantity: number) => void;
    books: Record<string, Book>;
}) {
    return (
        <Box sx={{ width: "100vw" }}>
            <GridBox>
                <Grid2 container spacing={"1.2vw"}>
                    <BookCard
                        onUpdateCart={onUpdateCart}
                        book={books["978-1473225046"]}
                    ></BookCard>
                    <BookCard
                        onUpdateCart={onUpdateCart}
                        book={books["978-0765316882"]}
                    ></BookCard>
                    <BookCard
                        onUpdateCart={onUpdateCart}
                        book={books["978-0765378569"]}
                    ></BookCard>
                    <BookCard
                        onUpdateCart={onUpdateCart}
                        book={books["978-1473225046"]}
                    ></BookCard>
                    <BookCard
                        onUpdateCart={onUpdateCart}
                        book={books["978-0765316882"]}
                    ></BookCard>
                    <BookCard
                        onUpdateCart={onUpdateCart}
                        book={books["978-0765378569"]}
                    ></BookCard>
                    <BookCard
                        onUpdateCart={onUpdateCart}
                        book={books["978-1473225046"]}
                    ></BookCard>
                    <BookCard
                        onUpdateCart={onUpdateCart}
                        book={books["978-0765316882"]}
                    ></BookCard>
                    <BookCard
                        onUpdateCart={onUpdateCart}
                        book={books["978-0765378569"]}
                    ></BookCard>
                    <BookCard
                        onUpdateCart={onUpdateCart}
                        book={books["978-1473225046"]}
                    ></BookCard>
                    <BookCard
                        onUpdateCart={onUpdateCart}
                        book={books["978-0765316882"]}
                    ></BookCard>
                    <BookCard
                        onUpdateCart={onUpdateCart}
                        book={books["978-0765378569"]}
                    ></BookCard>
                    <BookCard
                        onUpdateCart={onUpdateCart}
                        book={books["978-1473225046"]}
                    ></BookCard>
                    <BookCard
                        onUpdateCart={onUpdateCart}
                        book={books["978-0765316882"]}
                    ></BookCard>
                    <BookCard
                        onUpdateCart={onUpdateCart}
                        book={books["978-0765378569"]}
                    ></BookCard>
                    <BookCard
                        onUpdateCart={onUpdateCart}
                        book={books["978-1473225046"]}
                    ></BookCard>
                    <BookCard
                        onUpdateCart={onUpdateCart}
                        book={books["978-0765316882"]}
                    ></BookCard>
                    <BookCard
                        onUpdateCart={onUpdateCart}
                        book={books["978-0765378569"]}
                    ></BookCard>
                    <BookCard
                        onUpdateCart={onUpdateCart}
                        book={books["978-1473225046"]}
                    ></BookCard>
                    <BookCard
                        onUpdateCart={onUpdateCart}
                        book={books["978-0765316882"]}
                    ></BookCard>
                    <BookCard
                        onUpdateCart={onUpdateCart}
                        book={books["978-0765378569"]}
                    ></BookCard>
                    <BookCard
                        onUpdateCart={onUpdateCart}
                        book={books["978-1473225046"]}
                    ></BookCard>
                    <BookCard
                        onUpdateCart={onUpdateCart}
                        book={books["978-0765316882"]}
                    ></BookCard>
                    <BookCard
                        onUpdateCart={onUpdateCart}
                        book={books["978-0765378569"]}
                    ></BookCard>
                    <BookCard
                        onUpdateCart={onUpdateCart}
                        book={books["978-1473225046"]}
                    ></BookCard>
                    <BookCard
                        onUpdateCart={onUpdateCart}
                        book={books["978-0765316882"]}
                    ></BookCard>
                    <BookCard
                        onUpdateCart={onUpdateCart}
                        book={books["978-0765378569"]}
                    ></BookCard>
                </Grid2>
            </GridBox>
        </Box>
    );
}
