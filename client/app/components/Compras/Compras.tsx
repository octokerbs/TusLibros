import { Box, Divider, Modal, Typography } from "@mui/material";
import { Book } from "../../../types/cart";
import { InsideComprasBox, ItemComprasBox, OutsideComprasBox } from "./style";
import { forEachBook } from "../../../utils/book";

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
                                <OutsideComprasBox>
                                        <InsideComprasBox>
                                                {purchases &&
                                                        forEachBook(
                                                                catalog,
                                                                purchases,
                                                                (book: Book, quantity: number) => {
                                                                        return (
                                                                                <Box key={book.isbn}>
                                                                                        <ItemComprasBox>
                                                                                                <Typography
                                                                                                        component="div"
                                                                                                        noWrap
                                                                                                        color="black"
                                                                                                >
                                                                                                        {book.name}{" "}
                                                                                                </Typography>
                                                                                                <Typography
                                                                                                        component="div"
                                                                                                        noWrap
                                                                                                        color="black"
                                                                                                >
                                                                                                        {" "}
                                                                                                        x{quantity}{" "}
                                                                                                </Typography>
                                                                                        </ItemComprasBox>
                                                                                        <Divider />
                                                                                </Box>
                                                                        );
                                                                }
                                                        )}
                                        </InsideComprasBox>
                                </OutsideComprasBox>
                        </Modal>
                </Box>
        );
}
