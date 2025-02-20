import { useUI } from "@/contexts/UIContext";
import { Snackbar } from "@mui/material";
import React, { JSX } from "react";

export default function CheckoutPopup({}: {}) {
        const { alert, snackbarState, closeSnackbar } = useUI();
        return (
                <div>
                        <Snackbar
                                anchorOrigin={{
                                        vertical: snackbarState.vertical,
                                        horizontal: snackbarState.horizontal,
                                }}
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
