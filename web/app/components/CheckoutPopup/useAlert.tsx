import Alert from "@mui/material/Alert";
import useTheme from "@mui/material/styles/useTheme";
import { useCallback, useState } from "react";

export const useAlert = (onClose: () => void) => {
    const theme = useTheme();
    const [alertState, setAlertState] = useState(
        <Alert
            onClose={onClose}
            severity="warning"
            variant="filled"
            sx={{
                width: "92%",
                marginTop: "5.5vh",
            }}
        >
            No transaction could be done!
        </Alert>
    );

    const handleState = useCallback(
        (severityCode: "error" | "success", message: string) => {
            let color = theme.palette.primary.main;
            if (severityCode == "error") {
                color = theme.palette.secondary.main;
            }
            setAlertState(
                <Alert
                    onClose={onClose}
                    severity={severityCode}
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
        [onClose]
    );

    return { alertState, handleState };
};
