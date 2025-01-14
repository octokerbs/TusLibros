import { useState } from "react";
import { api } from "../utils/api";

export default function useCheckout(
        cartID: number,
        cart: Record<string, number>,
        requestCartID: () => void,
        openSnackbar: () => void
) {
        const [transactionID, setTransactionID] = useState<number>(-1);

        const requestCheckout = async () => {
                try {
                        const transactionID = await api.checkOutCart(
                                cartID,
                                "1111222233334444",
                                new Date("2025-08-26T14:00:00Z")
                        );
                        setTransactionID(transactionID);
                } catch (error) {
                        console.error("Failed to checkout cart: ", error);
                }
        };

        const handleCheckout = async () => {
                if (Object.keys(cart).length === 0) return;

                await requestCheckout();
                await requestCartID();
                openSnackbar();
        };

        return { transactionID, handleCheckout };
}
