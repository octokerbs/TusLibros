import { Snackbar } from "@mui/material";
import React, { JSX } from "react";

export default function CheckoutPopup({
        alert,
        open,
        vertical,
        horizontal,
}: {
        alert: JSX.Element;
        open: boolean;
        vertical: "bottom" | "top";
        horizontal: "center" | "left" | "right";
}) {
        return (
                <div>
                        <Snackbar
                                anchorOrigin={{ vertical, horizontal }}
                                open={open}
                                autoHideDuration={6000}
                                key={vertical + horizontal}
                        >
                                {alert}
                        </Snackbar>
                </div>
        );
}
