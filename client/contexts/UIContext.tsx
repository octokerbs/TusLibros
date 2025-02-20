"use client";

import { createContext, useContext, useCallback } from "react";
import useSnackbar from "../hooks/useSnackbar";
import { useAlert } from "../hooks/useAlert";

interface UIContextType {
        alert: {
                severity: "error" | "success";
                message: string;
        };
        updateAlert: (severity: "error" | "success", message: string) => void;
        snackbarState: {
                open: boolean;
                vertical: "top" | "bottom";
                horizontal: "left" | "center" | "right";
        };
        openSnackbar: () => void;
        closeSnackbar: () => void;
        handleError: (error: unknown) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
        const { snackbarState, openSnackbar, closeSnackbar } = useSnackbar(
                "top",
                "right"
        );
        const { alert, updateAlert } = useAlert();

        const handleError = useCallback(
                (error: unknown) => {
                        updateAlert("error", error as string);
                        openSnackbar();
                },
                [openSnackbar, updateAlert]
        );

        return (
                <UIContext.Provider
                        value={{
                                alert,
                                updateAlert,
                                snackbarState,
                                openSnackbar,
                                closeSnackbar,
                                handleError,
                        }}
                >
                        {children}
                </UIContext.Provider>
        );
}

export const useUI = () => {
        const context = useContext(UIContext);
        if (!context) {
                throw new Error("useUI must be used within a UIProvider");
        }
        return context;
};
