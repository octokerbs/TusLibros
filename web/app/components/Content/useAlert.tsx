import Alert from "@mui/material/Alert";
import useTheme from "@mui/material/styles/useTheme";
import { JSX, useCallback, useState } from "react";

export const useAlert = () => {
        const theme = useTheme();
        const [alert, setAlert] = useState<JSX.Element>(
                <Alert
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
                [theme.palette.primary.main, theme.palette.secondary.main]
        );

        return { alert, updateAlert };
};
