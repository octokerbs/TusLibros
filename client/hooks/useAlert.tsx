import useTheme from "@mui/material/styles/useTheme";
import {useCallback, useState} from "react";
import {OverridableStringUnion} from "@mui/types";
import {AlertColor, AlertPropsColorOverrides} from "@mui/material";

export const useAlert = () => {
    const theme = useTheme();
    const [severity, setSeverity] = useState<OverridableStringUnion<AlertColor, AlertPropsColorOverrides> | undefined>("warning");
    const [message, setMessage] = useState<string>("");
    const [color, setColor] = useState<string>(theme.palette.primary.main);

    const handleSuccessAlert = useCallback((message: string) => {
        setSeverity("success");
        setMessage(message);
        setColor(theme.palette.primary.main);
    }, [theme.palette.primary.main])

    const handleErrorAlert = useCallback((message: string) => {
        setSeverity("error");
        setMessage(message);
        setColor(theme.palette.secondary.main);
    }, [theme.palette.secondary.main])

    return {
        severity,
        message,
        color,
        handleSuccessAlert,
        handleErrorAlert
    }
};
