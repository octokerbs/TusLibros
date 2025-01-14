import { Alert, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { UserState } from "../Types/user";

export default function CheckoutPopup({
        userState,
        transactionID,
        onClose,
        open,
        vertical,
        horizontal,
}: {
        userState: UserState;
        transactionID: number;
        onClose: () => void;
        open: boolean;
        vertical: "bottom" | "top";
        horizontal: "center" | "left" | "right";
}) {
        const [alertState, setAlertState] = useState(
                <Alert
                        onClose={onClose}
                        severity="warning"
                        variant="filled"
                        sx={{
                                width: "92%",
                                marginTop: "5.5vh",
                                bgcolor: "#567568",
                        }}
                >
                        No transaction could be done!
                </Alert>
        );

        useEffect(() => {
                switch (userState) {
                        case UserState.InvalidUser:
                                setAlertState(
                                        <Alert
                                                onClose={onClose}
                                                severity="error"
                                                variant="filled"
                                                sx={{
                                                        width: "17vw",
                                                        marginTop: "5.5vh",
                                                }}
                                        >
                                                Can not check out, invalid user!
                                        </Alert>
                                );
                                break;

                        case UserState.ExpiredCreditCardUser:
                                setAlertState(
                                        <Alert
                                                onClose={onClose}
                                                severity="error"
                                                variant="filled"
                                                sx={{
                                                        width: "17vw",
                                                        marginTop: "5.5vh",
                                                }}
                                        >
                                                Can not check out, the used
                                                credit card is expired!
                                        </Alert>
                                );
                                break;

                        case UserState.NoFundsCreditCardUser:
                                setAlertState(
                                        <Alert
                                                onClose={onClose}
                                                severity="error"
                                                variant="filled"
                                                sx={{
                                                        width: "17vw",
                                                        marginTop: "5.5vh",
                                                }}
                                        >
                                                Can not check out, the credit
                                                card has insufficient funds!
                                        </Alert>
                                );
                                break;

                        default:
                                setAlertState(
                                        <Alert
                                                onClose={onClose}
                                                severity="success"
                                                variant="filled"
                                                sx={{
                                                        width: "17vw",
                                                        marginTop: "5.5vh",
                                                        bgcolor: "#567568",
                                                }}
                                        >
                                                Transaction #{transactionID}{" "}
                                                completed succesfully!
                                        </Alert>
                                );
                                break;
                }
        }, [onClose, userState, transactionID]);

        return (
                <div>
                        <Snackbar
                                anchorOrigin={{ vertical, horizontal }}
                                open={open}
                                autoHideDuration={6000}
                                onClose={onClose}
                                key={vertical + horizontal}
                        >
                                {alertState}
                        </Snackbar>
                </div>
        );
}
