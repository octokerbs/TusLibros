import Box from "@mui/material/Box";
import BookGrid from "./components/Grid";
import Header from "./components/HeaderBar";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "TusLibros",
    description: "BookShop built in Go and Nextjs with TDD",
};

export default function Home() {
    return (
        <Box sx={{ bgcolor: "#F3FCF0", width: "100vw", overflow: "auto" }}>
            <Header></Header>
            <BookGrid></BookGrid>
        </Box>
    );
}
