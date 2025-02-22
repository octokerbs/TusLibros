import React, {useCallback, useContext} from "react";
import {api} from "@/utils/api";
import {useNotification} from "@/context/NotificationContext";

interface CartContextType {
    cart: Record<string, number>
    handleEmptyCart: () => void;
    handleAddToCart: (cartID: number, isbn: string, quantity: number) => void;
    handleCheckoutCart: (cartID: number, creditCardNumber: string, creditCardExpirationDate: Date) => void;
}

const CartContext = React.createContext<CartContextType | null>(null);

export function CartProvider({children}: { children: React.ReactNode }) {
    const [cart, setCart] = React.useState<Record<string, number>>({});
    const notification = useNotification();

    const handleEmptyCart = useCallback(() => {
        setCart({});
    }, []);

    const handleAddToCart = useCallback(async (cartID: number, isbn: string, quantity: number) => {
        try {
            await api.addToCart(cartID, isbn, quantity);
            const items = await api.listCart(cartID);
            setCart(items);
        } catch (error) {
            notification.handleError(error);
        }
    }, [notification]);

    const handleCheckoutCart = useCallback(async (cartID: number, creditCardNumber: string, creditCardExpirationDate: Date) => {
        try {
            const transactionID = await api.checkOutCart(
                cartID,
                creditCardNumber,
                creditCardExpirationDate
            );
            notification.handleSuccess("Transaction #" + transactionID + " completed successfully, thank you!");
        } catch (error) {
            notification.handleError(error);
        }
    }, [notification]);

    return (
        <CartContext.Provider
            value={{cart, handleEmptyCart, handleAddToCart, handleCheckoutCart}}>
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
