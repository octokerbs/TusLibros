import { useState, useCallback } from "react";
import { SnackbarState } from "../Types/user";

export default function useSnackbar(
    defaultVertical: SnackbarState["vertical"],
    defaultHorizontal: SnackbarState["horizontal"]
) {
    const [snackbarState, setSnackbarState] = useState<SnackbarState>({
        open: false,
        vertical: defaultVertical,
        horizontal: defaultHorizontal,
    });

    const openSnackbar = useCallback(() => {
        setSnackbarState((prev) => ({ ...prev, open: true }));
    }, []);

    const closeSnackbar = useCallback(() => {
        setSnackbarState((prev) => ({ ...prev, open: false }));
    }, []);

    return { snackbarState, openSnackbar, closeSnackbar };
}
