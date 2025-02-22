import {AlertColor, AlertPropsColorOverrides, Snackbar} from "@mui/material";
import React from "react";
import Alert from "@mui/material/Alert";
import {OverridableStringUnion} from "@mui/types";

export default function Notification({
                                         severity,
                                         message,
                                         color,
                                         open,
                                         onCloseSnackbar,
                                     }: {
    severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides> | undefined,
    message: string,
    color: string,
    open: boolean,
    onCloseSnackbar: () => void;
}) {
    const vertical = "top"
    const horizontal = "right"

    return (
        <Snackbar
            anchorOrigin={{vertical, horizontal}}
            open={open}
            autoHideDuration={2000}
            onClose={onCloseSnackbar}
            key={vertical + horizontal}
        >
            <Alert
                severity={severity}
                variant="filled"
                sx={{
                    width: "17vw",
                    marginTop: "5.5vh",
                    bgcolor: color,
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}
