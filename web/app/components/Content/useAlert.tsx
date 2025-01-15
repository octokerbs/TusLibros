import Alert from "@mui/material/Alert";
import useTheme from "@mui/material/styles/useTheme";
import { JSX, useCallback, useState } from "react";

export const useAlert = (closeSnackbar: () => void) => {
        const theme = useTheme();
        const [alert, setAlert] = useState<JSX.Element>(
                <Alert
                        onClose={closeSnackbar}
                        severity="warning"
                        variant="filled"
                        sx={{
                                width: "17vw",
                                marginTop: "5.5vh",
                        }}
                >
                        Nothing to do!
                </Alert>
        );

        const updateAlert = useCallback(
                (severity: "error" | "success", message: string) => {
                        let color = theme.palette.primary.main;
                        if (severity == "error") {
                                color = theme.palette.secondary.main;
                        }
                        setAlert(
                                <Alert
                                        onClose={closeSnackbar}
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
                        );
                },
                [
                        closeSnackbar,
                        theme.palette.primary.main,
                        theme.palette.secondary.main,
                ]
        );

        return { alert, updateAlert };
};
