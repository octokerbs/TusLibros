"use client";

import { createContext, useContext, useCallback, useState } from "react";
import { api } from "../services/api";
import { useUser } from "./UserContext";
import { useUI } from "./UIContext";

interface CartContextType {
        cart: Record<string, number>;
        purchases: Record<string, number>;
        handleAddToCart: (
                isbn: string,
                counter: number,
                restartCounter: () => void
        ) => Promise<void>;
        handleListPurchases: () => Promise<void>;
        finishTransaction: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
        const { handleError, updateAlert, openSnackbar } = useUI();
        const { user } = useUser();

        const [cart, setCart] = useState<Record<string, number>>({});
        const [purchases, setPurchases] = useState<Record<string, number>>({});

        const updateCart = useCallback(
                async (items: Record<string, number>) => {
                        setCart(items);
                },
                []
        );

        const handleAddToCart = useCallback(
                async (
                        isbn: string,
                        counter: number,
                        restartCounter: () => void
                ) => {
                        try {
                                await api.addToCart(user.cartID, isbn, counter);
                                const items = await api.listCart(user.cartID);
                                updateCart(items);
                        } catch (error) {
                                handleError(error);
                        }
                        restartCounter();
                },
                [handleError, updateCart, user.cartID]
        );

        const handleCheckoutCart = useCallback(async () => {
                try {
                        const transactionID = await api.checkOutCart(
                                user.cartID,
                                user.creditCardNumber,
                                user.creditCardExpirationDate
                        );
                        updateAlert(
                                "success",
                                "Transaction #" +
                                        transactionID +
                                        " completed successfully, thank you!"
                        );
                        updateCart({});
                } catch (error) {
                        handleError(error);
                }
        }, [
                handleError,
                updateAlert,
                updateCart,
                user.cartID,
                user.creditCardExpirationDate,
                user.creditCardNumber,
        ]);

        const handleListPurchases = useCallback(async () => {
                try {
                        const purchases = await api.listPurchases(
                                user.clientId,
                                user.password
                        );
                        setPurchases(purchases);
                } catch (error) {
                        handleError(error);
                }
        }, [handleError, user.clientId, user.password]);

        const finishTransaction = useCallback(async () => {
                if (Object.keys(cart).length === 0) return;
                await handleCheckoutCart();
                openSnackbar();
        }, [cart, openSnackbar, handleCheckoutCart]);

        return (
                <CartContext.Provider
                        value={{
                                cart,
                                purchases,
                                handleAddToCart,
                                handleListPurchases,
                                finishTransaction,
                        }}
                >
                        {children}
                </CartContext.Provider>
        );
}

export const useCart = () => {
        const context = useContext(CartContext);
        if (!context) {
                throw new Error("useCart must be used within a CartProvider");
        }
        return context;
};
