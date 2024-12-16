import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";
import BookCard from "./BookCard";

export default function BookGrid() {
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
                <Grid2 container spacing={"1.3vw"}>
                    <BookCard></BookCard>
                    <BookCard></BookCard>
                    <BookCard></BookCard>
                    <BookCard></BookCard>
                    <BookCard></BookCard>
                    <BookCard></BookCard>
                    <BookCard></BookCard>
                    <BookCard></BookCard>
                    <BookCard></BookCard>
                    <BookCard></BookCard>
                    <BookCard></BookCard>
                    <BookCard></BookCard>
                    <BookCard></BookCard>
                    <BookCard></BookCard>
                    <BookCard></BookCard>
                    <BookCard></BookCard>
                </Grid2>
            </Box>
        </Box>
    );
}
