import {Box, Divider, Modal, styled, Typography} from "@mui/material";
import {Book} from "@/types/cart";
import {forEachBook} from "@/utils/book";

const OutsideComprasBox = styled(Box)(({}) => ({
    position: "absolute",
    height: "80vh",
    width: "60vw",
    marginLeft: "20vw",
    marginRight: "20vw",
    marginTop: "8vh",
    backgroundColor: "white",
    borderRadius: "10px",
    p: 4,
}));

const InsideComprasBox = styled(Box)(({}) => ({
    marginTop: "4vh",
    marginBottom: "4vh",
    marginLeft: "2vw",
    marginRight: "2vw",
}));

const ItemComprasBox = styled(Box)(({}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "1vh",
    marginBottom: "1vh",
    marginLeft: "1vw",
    marginRight: "1vw",
    width: "55vw",
}));

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
                                            <Divider/>
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
