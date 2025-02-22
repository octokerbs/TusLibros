import React, {useCallback, useContext, useState} from "react";
import {User, UserState} from "@/types/user";
import {DefaultUsers} from "@/utils/localdb";
import {api} from "@/utils/api";
import {useNotification} from "@/context/NotificationContext";


interface UserContextType {
    user: User;
    handleNewUserState: (newState: UserState) => void;
    handleNewCartID: (cartID: number) => void;
    handleListPurchases: () => Promise<Record<string, number>>;
}

const UserContext = React.createContext<UserContextType | null>(null);

export function UserProvider({children}: { children: React.ReactNode }) {
    const [user, setUser] = useState<User>(DefaultUsers[UserState.ValidUser]);
    const notification = useNotification();
    //const cart = useCart();

    const handleNewUserState = useCallback((newState: UserState) => {
        const newUser = DefaultUsers[newState];
        setUser(newUser);
    }, []);

    const handleNewCartID = useCallback(async () => {
        try {
            const cartID = await api.createCart(user.clientId, user.password);
            setUser({...user, cartID});
        } catch (error) {
            notification.handleError(error);
        }
    }, [notification, user]);

    const handleListPurchases = useCallback(async (): Promise<Record<string, number>> => {
        return await api.listPurchases(user.clientId, user.password);
    }, [user.clientId, user.password]);

    return (
        <UserContext.Provider
            value={{user, handleNewUserState, handleNewCartID, handleListPurchases}}>
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
