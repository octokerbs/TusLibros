import { Snackbar } from "@mui/material";
import React, { JSX } from "react";

export default function CheckoutPopup({
        alert,
        closeSnackbar,
        open,
        vertical,
        horizontal,
}: {
        alert: JSX.Element;
        closeSnackbar: () => void;
        open: boolean;
        vertical: "bottom" | "top";
        horizontal: "center" | "left" | "right";
}) {
        return (
                <div>
                        <Snackbar
                                anchorOrigin={{ vertical, horizontal }}
                                open={open}
                                autoHideDuration={2000}
                                onClose={closeSnackbar}
                                key={vertical + horizontal}
                        >
                                {alert}
                        </Snackbar>
                </div>
        );
}
