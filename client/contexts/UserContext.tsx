"use client";

import { createContext, useContext, useCallback, useState } from "react";
import { User, UserState } from "../types/user";
import { DefaultUsers } from "@/utils/localdb";

interface UserContextType {
        user: User;
        updateUserState: (state: UserState) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
        const [user, setUser] = useState<User>(
                DefaultUsers[UserState.ValidUser]
        );

        const updateUserState = useCallback(async (state: UserState) => {
                const newUser = DefaultUsers[state];
                setUser(newUser);
        }, []);

        return (
                <UserContext.Provider value={{ user, updateUserState }}>
                        {children}
                </UserContext.Provider>
        );
}

export const useUser = () => {
        const context = useContext(UserContext);
        if (!context) {
                throw new Error("useUser must be used within a UserProvider");
        }
        return context;
};
