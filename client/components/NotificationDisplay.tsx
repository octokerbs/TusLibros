import {Snackbar} from "@mui/material";
import React from "react";
import Alert from "@mui/material/Alert";
import {useNotification} from "@/context/NotificationContext";

export default function NotificationDisplay() {
    const notification = useNotification();

    const vertical = "top"
    const horizontal = "right"

    return (
        <Snackbar
            anchorOrigin={{vertical, horizontal}}
            open={notification.open}
            autoHideDuration={2000}
            onClose={notification.handleCloseNotificationBar}
            key={vertical + horizontal}
        >
            <Alert
                severity={notification.severity}
                variant="filled"
                sx={{
                    width: "17vw",
                    marginTop: "5.5vh",
                    bgcolor: notification.color,
                }}
            >
                {notification.message}
            </Alert>
        </Snackbar>
    );
}
