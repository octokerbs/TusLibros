import { Box, Divider, Modal, Typography } from "@mui/material";
import { Book } from "./types";

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
        onClose,
        catalog,
        purchases,
}: {
        open: boolean;
        onClose: () => void;
        catalog: Record<string, Book>;
        purchases: Record<string, number>;
}) {
        return (
                <Box>
                        <Modal
                                open={open}
                                onClose={onClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                        >
                                <Box sx={style}>
                                        <Box>
                                                {purchases &&
                                                        Object.keys(
                                                                purchases
                                                        ).map((item) => {
                                                                const book =
                                                                        catalog[
                                                                                item
                                                                        ];
                                                                const quantity =
                                                                        purchases[
                                                                                item
                                                                        ];

                                                                return (
                                                                        <Box
                                                                                key={
                                                                                        book.isbn
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
                                                                                                        catalog[
                                                                                                                book
                                                                                                                        .isbn
                                                                                                        ]
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
                                                                                                        quantity
                                                                                                }{" "}
                                                                                        </Typography>
                                                                                </Box>
                                                                                <Divider />
                                                                        </Box>
                                                                );
                                                        })}
                                        </Box>
                                </Box>
                        </Modal>
                </Box>
        );
}
