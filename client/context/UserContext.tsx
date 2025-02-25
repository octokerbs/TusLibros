import React, {useCallback, useContext, useState} from "react";
import {User, UserState} from "@/types/user";
import {DefaultUsers} from "@/utils/localdb";
import {api} from "@/utils/api";
import {useNotification} from "@/context/NotificationContext";
import {useCart} from "@/context/CartContext";

interface UserContextType {
    cartID: () => number;
    creditCardNumber: () => string;
    creditCardExpirationDate: () => Date;
    state: () => UserState;
    menuIcon: () => React.JSX.Element;
    handleNewUserState: (newState: UserState) => Promise<void>;
    handleListPurchases: () => Promise<Record<string, number>>;
}

const UserContext = React.createContext<UserContextType | null>(null);

export function UserProvider({children}: { children: React.ReactNode }) {
    const notification = useNotification();
    const cart = useCart();
    const [user, setUser] = useState<User>(DefaultUsers[UserState.ValidUser]);

    const handleNewUserState = useCallback(async (newState: UserState) => {
        try {
            const newUser = DefaultUsers[newState];
            newUser.cartID = await api.createCart(newUser.clientId, newUser.password);
            setUser(newUser);
            cart.emptyCart();   // Every time we change the user we want a clean cart
        } catch (e) {
            notification.handleError(e);
        }
    }, [cart, notification]);

    const handleListPurchases = useCallback(async (): Promise<Record<string, number>> => {
        let purchases: Record<string, number> = {};
        try {
            purchases = await api.listPurchases(user.clientId, user.password);
        } catch (e) {
            notification.handleError(e);
        }
        return purchases;
    }, [notification, user.clientId, user.password]);

    const cartID = useCallback((): number => {
        return user.cartID;
    }, [user.cartID]);

    const creditCardNumber = useCallback((): string => {
        return user.creditCardNumber;
    }, [user.creditCardNumber]);

    const creditCardExpirationDate = useCallback((): Date => {
        return user.creditCardExpirationDate;
    }, [user.creditCardExpirationDate]);

    const menuIcon = useCallback((): React.JSX.Element => {
        return user.logo;
    }, [user.logo]);

    const state = useCallback((): UserState => {
        return user.state;
    }, [user.state]);

    return (
        <UserContext.Provider
            value={{
                cartID,
                creditCardNumber,
                creditCardExpirationDate,
                state,
                menuIcon,
                handleNewUserState,
                handleListPurchases,
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
