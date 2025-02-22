import {useState, useCallback} from "react";

export default function useSnackbar() {
    const [open, setOpen] = useState(false);

    const handleOpenNotificationBar = useCallback(() => {
        setOpen(true);
    }, []);

    const handleCloseNotificationBar = useCallback(() => {
        setOpen(false);
    }, []);

    return {open, handleOpenNotificationBar, handleCloseNotificationBar};
}
