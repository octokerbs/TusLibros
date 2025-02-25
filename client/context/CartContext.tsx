import React, {useCallback, useContext} from "react";
import {api} from "@/api/api";
import {useNotification} from "@/context/NotificationContext";

export interface CartContextType {
    items: Record<string, number>
    handleAddToCart: (
        cartID: number,
        isbn: string,
        quantity: number
    ) => Promise<void>;
    handleListCart: (cartID: number) => Promise<void>;
    handleCheckoutCart: (
        cartID: number,
        creditCardNumber: string,
        creditCardExpirationDate: Date
    ) => Promise<void>;
    emptyCart: () => void;
}

const CartContext = React.createContext<CartContextType | null>(null);

export function CartProvider({children}: { children: React.ReactNode }) {
    const notification = useNotification();
    const [items, setItems] = React.useState<Record<string, number>>({});

    const handleAddToCart = useCallback(async (cartID: number, isbn: string, quantity: number) => {
            try {
                await api.addToCart(cartID, isbn, quantity);
            } catch (e) {
                notification.handleError(e);
            }
        },
        [notification]
    );

    const handleListCart = useCallback(async (cartID: number) => {
        try {
            const newItems = await api.listCart(cartID);
            setItems(newItems);
        } catch (e) {
            notification.handleError(e)
        }
    }, [notification]);

    const handleCheckoutCart = useCallback(async (cartID: number, creditCardNumber: string, creditCardExpirationDate: Date) => {
            try {
                const transactionID = await api.checkOutCart(cartID, creditCardNumber, creditCardExpirationDate);
                notification.handleSuccess("Transaction #" + transactionID + " completed successfully, thank you!");
            } catch (e) {
                notification.handleError(e);
            }
        },
        [notification]
    );

    const emptyCart = useCallback(() => {
        setItems({})
    }, []);

    return (
        <CartContext.Provider
            value={{
                items,
                handleAddToCart,
                handleListCart,
                handleCheckoutCart,
                emptyCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
