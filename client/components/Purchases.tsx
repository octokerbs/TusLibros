import {Box, Divider, Modal, styled, Typography} from "@mui/material";
import {Book} from "@/types/cart";
import {forEachBook} from "@/utils/book";
import {useUser2} from "@/context/UserContext";
import {useEffect, useState} from "react";
import {useNotification} from "@/context/NotificationContext";

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

export default function Purchases({
                                      open,
                                      onClose,
                                      catalog,
                                  }: {
    open: boolean;
    onClose: () => void;
    catalog: Record<string, Book>;
}) {
    const [purchases, setPurchases] = useState<Record<string, number>>({});
    const user = useUser2();
    const notification = useNotification();


    useEffect(() => {
        if (!open) return;

        const fetchPurchases = async () => {
            try {
                const purchases = await user.handleListPurchases();
                setPurchases(purchases);
            } catch (error) {
                notification.handleError(error);
            }
        };

        fetchPurchases();
    }, [notification, open, user]);

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
                        {forEachBook(
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
