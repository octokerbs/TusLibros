import React, {useCallback, useContext, useState} from "react";
import {User, UserState} from "@/types/user";
import {DefaultUsers} from "@/utils/localdb";
import {api} from "@/utils/api";
import {useNotification} from "@/context/NotificationContext";

interface UserContextType {
    user: User;
    handleNewUserState: (newState: UserState) => Promise<void>;
    handleNewCartID: (clientId: string, password: string) => Promise<number>;
    handleListPurchases: () => Promise<Record<string, number>>;
}

const UserContext = React.createContext<UserContextType | null>(null);

export function UserProvider({children}: { children: React.ReactNode }) {
    const [user, setUser] = useState<User>(
        DefaultUsers[UserState.ValidUser]
    );
    const notification = useNotification();

    const handleNewCartID = useCallback(async (clientId: string, password: string): Promise<number> => {
        let cartId: number = -1
        try {
            cartId = await api.createCart(clientId, password)
        } catch (error) {
            notification.handleError(error);
        }
        return cartId;
    }, [notification]);

    const handleNewUserState = useCallback(async (newState: UserState) => {
        try {
            const newUser = DefaultUsers[newState];
            const cartID = await handleNewCartID(newUser.clientId, newUser.password);
            setUser({...newUser, cartID});
        } catch (e) {
            notification.handleError(e);
        }
    }, [handleNewCartID, notification]);

    const handleListPurchases = useCallback(async (): Promise<
        Record<string, number>
    > => {
        let purchases: Record<string, number> = {};
        try {
            purchases = await api.listPurchases(user.clientId, user.password);
        } catch (e) {
            notification.handleError(e);
        }
        return purchases;
    }, [notification, user.clientId, user.password]);

    return (
        <UserContext.Provider
            value={{
                user,
                handleNewUserState,
                handleNewCartID,
                handleListPurchases,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUser2() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
