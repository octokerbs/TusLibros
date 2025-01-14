import { Box, Divider, Modal, Typography } from "@mui/material";
import { Book } from "../Types/cart";
import { InsideComprasBox, ItemComprasBox, OutsideComprasBox } from "./style";

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
                                                                                <ItemComprasBox>
                                                                                        <Typography
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
                                                                                </ItemComprasBox>
                                                                                <Divider />
                                                                        </Box>
                                                                );
                                                        })}
                                        </InsideComprasBox>
                                </OutsideComprasBox>
                        </Modal>
                </Box>
        );
}
