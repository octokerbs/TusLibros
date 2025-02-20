import { Metadata } from "next";
import Content from "../components/Content";
import { UserProvider } from "@/contexts/UserContext";
import { CartProvider } from "@/contexts/CartContext";
import { useCallback } from "react";
import { useAlert } from "@/hooks/useAlert";
import useSnackbar from "@/hooks/useSnackbar";

export const metadata: Metadata = {
        title: "TusLibros",
        description: "BookShop built in Go and Nextjs with TDD",
};

// No me juzguen, es la segunda vez en mi vida que hago frontend ^_^

export default function MainPage() {
        const { alert, updateAlert } = useAlert();
        const { snackbarState, openSnackbar, closeSnackbar } = useSnackbar(
                "top",
                "right"
        );

        const handleError = useCallback(
                (error: unknown) => {
                        updateAlert("error", error as string);
                        openSnackbar();
                },
                [openSnackbar, updateAlert]
        );

        return (
                <UserProvider>
                        <CartProvider
                                handleError={handleError}
                                updateAlert={updateAlert}
                                openSnackbar={openSnackbar}
                        >
                                <Content
                                        onHandleError={handleError}
                                        alert={alert}
                                        snackbarState={snackbarState}
                                        onCloseSnackbar={closeSnackbar}
                                />
                        </CartProvider>
                </UserProvider>
        );
}
