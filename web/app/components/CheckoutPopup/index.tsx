import { Snackbar } from "@mui/material";
import React, { useEffect } from "react";
import { UserState } from "../Types/user";
import { useAlert } from "./useAlert";

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
        const { alertState, handleState } = useAlert(onClose);

        useEffect(() => {
                switch (userState) {
                        case UserState.InvalidUser:
                                handleState(
                                        "error",
                                        "Can not check out, invalid user!"
                                );
                                break;

                        case UserState.ExpiredCreditCardUser:
                                handleState(
                                        "error",
                                        "Can not check out, the used credit card is expired!"
                                );
                                break;

                        case UserState.NoFundsCreditCardUser:
                                handleState(
                                        "error",
                                        "Can not check out, the credit card has insufficient funds!"
                                );
                                break;

                        default:
                                handleState(
                                        "success",
                                        "Transaction Nº" +
                                                transactionID +
                                                "completed succesfully!"
                                );
                                break;
                }
        }, [userState, transactionID, handleState]);

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
