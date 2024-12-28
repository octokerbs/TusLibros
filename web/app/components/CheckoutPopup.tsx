import { Alert, Button, Snackbar, SnackbarOrigin } from "@mui/material";
import React, { useEffect, useState } from "react";
import { UserState } from "./Content";

export default function CheckoutPopup({
        userState,
        handleClose,
        open,
        vertical,
        horizontal,
}: {
        userState: UserState;
        handleClose: () => void;
        open: boolean;
        vertical: "bottom" | "top";
        horizontal: "center" | "left" | "right";
}) {
        const [alertState, setAlertState] = useState(
                <Alert
                        onClose={handleClose}
                        severity="success"
                        variant="filled"
                        sx={{
                                width: "92%",
                                marginTop: "5.5vh",
                                bgcolor: "#567568",
                        }}
                >
                        Transaction completed succesfully!
                </Alert>
        );

        useEffect(() => {
                switch (userState) {
                        case UserState.InvalidUser:
                                setAlertState(
                                        <Alert
                                                onClose={handleClose}
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
                                                onClose={handleClose}
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
                                                onClose={handleClose}
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
                                                onClose={handleClose}
                                                severity="success"
                                                variant="filled"
                                                sx={{
                                                        width: "17vw",
                                                        marginTop: "5.5vh",
                                                        bgcolor: "#567568",
                                                }}
                                        >
                                                Transaction completed
                                                succesfully!
                                        </Alert>
                                );
                                break;
                }
        }, [userState]);

        return (
                <div>
                        <Snackbar
                                anchorOrigin={{ vertical, horizontal }}
                                open={open}
                                autoHideDuration={6000}
                                onClose={handleClose}
                                key={vertical + horizontal}
                        >
                                {alertState}
                        </Snackbar>
                </div>
        );
}
