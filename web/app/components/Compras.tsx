import { Box, Divider, Modal, Typography } from "@mui/material";
import { Book } from "./Content";

const style = {
        position: "absolute",
        height: "80vh",
        width: "60vw",
        marginLeft: "20vw",
        marginRight: "20vw",
        marginTop: "8vh",
        bgcolor: "white",
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,
};

export default function Compras({
        open,
        handleCloseCompras,
        books,
}: {
        open: boolean;
        handleCloseCompras: () => void;
        books: Map<string, Book>;
}) {
        let purchases = new Map<string, number>();
        purchases.set("978-1473225046", 10);
        purchases.set("978-0765316882", 2);

        let purchasesArray = Array.from(purchases, ([isbn, quantity]) => ({
                isbn,
                quantity,
        }));

        return (
                <Box>
                        <Modal
                                open={open}
                                onClose={handleCloseCompras}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                        >
                                <Box sx={style}>
                                        <Box>
                                                {purchasesArray.map(
                                                        (purchase) => (
                                                                <Box
                                                                        key={
                                                                                purchase.isbn
                                                                        }
                                                                >
                                                                        <Box
                                                                                sx={{
                                                                                        display: "flex",
                                                                                        alignItems: "center",
                                                                                        justifyContent:
                                                                                                "space-between",
                                                                                        marginLeft: "1vw",
                                                                                        marginRight:
                                                                                                "1vw",
                                                                                        width: "55vw",
                                                                                }}
                                                                        >
                                                                                <Typography
                                                                                        gutterBottom
                                                                                        variant="inherit"
                                                                                        component="div"
                                                                                        noWrap
                                                                                        color="black"
                                                                                >
                                                                                        {
                                                                                                books.get(
                                                                                                        purchase.isbn
                                                                                                )
                                                                                                        ?.name
                                                                                        }{" "}
                                                                                </Typography>
                                                                                <Typography
                                                                                        gutterBottom
                                                                                        variant="inherit"
                                                                                        component="div"
                                                                                        noWrap
                                                                                        color="black"
                                                                                >
                                                                                        {" "}
                                                                                        x
                                                                                        {
                                                                                                purchase.quantity
                                                                                        }{" "}
                                                                                </Typography>
                                                                        </Box>
                                                                        <Divider />
                                                                </Box>
                                                        )
                                                )}
                                        </Box>
                                </Box>
                        </Modal>
                </Box>
        );
}
