import { useCallback, useState } from "react";
import { api } from "../utils/api";
import { User, UserState } from "../Types/user";
import { DefaultUsers } from "../utils/localdb";

export default function useUser() {
        const [user, setUser] = useState<User>(
                DefaultUsers[UserState.ValidUser]
        );

        const [purchases, setPurchases] = useState<Record<string, number>>({});

        const requestUserPurchases = useCallback(async () => {
                try {
                        const purchases = await api.listPurchases(
                                "Octo",
                                "Kerbs"
                        );
                        setPurchases(purchases);
                } catch (error) {
                        throw error;
                }
        }, []);

        const updateUserCartID = useCallback((cartID: number) => {
                setUser((prevUser) => ({
                        ...prevUser,
                        cartID: cartID,
                }));
        }, []);

        const updateUserState = useCallback((state: UserState) => {
                setUser(DefaultUsers[state]);
        }, []);

        return {
                user,
                purchases,
                requestUserPurchases,
                updateUserState,
                updateUserCartID,
        };
}
