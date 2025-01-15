import { useState } from "react";
import { api } from "../utils/api";
import { UserState } from "../Types/user";

export default function useUser() {
    const [userState, setUserState] = useState(UserState.ValidUser);
    const [purchases, setPurchases] = useState<Record<string, number>>({});

    const requestUserPurchases = async () => {
        try {
            const purchases = await api.listPurchases("Octo", "Kerbs");
            setPurchases(purchases);
        } catch (error) {
            console.error("Failed to list purchases: ", error);
        }
    };

    const updateUserState = (state: UserState) => {
        setUserState(state);
    };

    return { userState, purchases, requestUserPurchases, updateUserState };
}
