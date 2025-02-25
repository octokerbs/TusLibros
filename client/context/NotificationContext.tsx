import React, {useCallback, useContext} from "react";
import useSnackbar from "@/hooks/useSnackbar";
import {useAlert} from "@/hooks/useAlert";

interface UIContextType {
    open: boolean;
    severity: "success" | "warning" | "info" | "error";
    message: string;
    color: string;
    handleSuccess: (message: string) => void;
    handleError: (error: unknown) => void;
    handleCloseNotificationBar: () => void;
}

const NotificationContext = React.createContext<UIContextType | null>(null);

export function NotificationProvider({
                                         children,
                                     }: {
    children: React.ReactNode;
}) {
    const {open, handleOpenNotificationBar, handleCloseNotificationBar} =
        useSnackbar();
    const {
        severity,
        message,
        color,
        handleSuccessAlert,
        handleErrorAlert,
    } = useAlert();

    const handleSuccess = useCallback(
        (message: string) => {
            handleSuccessAlert(message);
            handleOpenNotificationBar();
        },
        [handleSuccessAlert, handleOpenNotificationBar]
    );

    const handleError = useCallback(
        (error: unknown) => {
            const errorMessage = error instanceof Error
                ? error.message
                : typeof error === 'string'
                    ? error
                    : 'An unknown error occurred';
            handleErrorAlert(errorMessage);
            handleOpenNotificationBar();
        },
        [handleErrorAlert, handleOpenNotificationBar]
    );

    return (
        <NotificationContext.Provider
            value={{
                open,
                severity,
                message,
                color,
                handleSuccess,
                handleError,
                handleCloseNotificationBar,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error(
            "useNotification must be used within a NotificationProvider"
        );
    }
    return context;
}
