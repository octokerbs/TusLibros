import React, {useCallback, useContext, useState} from "react";
import {LocalUsers, User, UserState} from "@/utils/user";
import {api} from "@/api/api";
import {useNotification} from "@/context/NotificationContext";
import {CartContextType} from "@/context/CartContext";

interface UserContextType {
    state: () => UserState;
    purchases: Record<string, number>;
    handleNewUserStateWith: (cart: CartContextType, newState: UserState) => Promise<void>;
    handleListPurchases: () => Promise<void>;
    handleAddToCartWith: (cart: CartContextType, isbn: string, quantity: number) => void,
    handleListCartWith: (cart: CartContextType) => void,
    handleCheckoutCartWith: (cart: CartContextType) => void,
}

const UserContext = React.createContext<UserContextType | null>(null);

export function UserProvider({children}: { children: React.ReactNode }) {
    const notification = useNotification();
    const [user, setUser] = useState<User>(LocalUsers[UserState.ValidUser]);
    const [purchases, setPurchases] = useState<Record<string, number>>({});

    const handleNewUserStateWith = useCallback(async (cart: CartContextType, newState: UserState) => {
        try {
            const newUser = LocalUsers[newState];
            newUser.cartID = await api.createCart(newUser.clientId, newUser.password);
            setUser(newUser);
            cart.emptyCart()
        } catch (e) {
            notification.handleError(e);
        }
    }, [notification]);

    const handleAddToCartWith = useCallback(async (cart: CartContextType, isbn: string, quantity: number) => {
        await cart.handleAddToCart(user.cartID, isbn, quantity);
    }, [user.cartID])

    const handleListCartWith = useCallback(async (cart: CartContextType) => {
        await cart.handleListCart(user.cartID);
    }, [user.cartID])

    const handleCheckoutCartWith = useCallback(async (cart: CartContextType) => {
        await cart.handleCheckoutCart(user.cartID, user.creditCardNumber, user.creditCardExpirationDate)
    }, [user.cartID, user.creditCardExpirationDate, user.creditCardNumber])

    const handleListPurchases = useCallback(async (): Promise<void> => {
        try {
            const updatedPurchases = await api.listPurchases(user.clientId, user.password);
            setPurchases(updatedPurchases);
        } catch (e) {
            notification.handleError(e);
        }
    }, [notification, user.clientId, user.password]);

    const state = useCallback((): UserState => {
        return user.state;
    }, [user.state]);

    return (
        <UserContext.Provider
            value={{
                state,
                purchases,
                handleNewUserStateWith,
                handleListPurchases,
                handleAddToCartWith,
                handleListCartWith,
                handleCheckoutCartWith,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
