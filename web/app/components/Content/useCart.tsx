import { useCallback, useState } from "react";
import { api } from "../utils/api";
import { User } from "../Types/user";

export default function useCart(
        user: User,
        updateUserCartID: (cartID: number) => void
) {
        const [cart, setCart] = useState<Record<string, number>>({});

        const requestCartID = useCallback(async () => {
                try {
                        const cartID = await api.createCart(
                                user.clientId,
                                user.password
                        );
                        updateUserCartID(cartID);
                        setCart({});
                } catch (error) {
                        throw error;
                }
        }, [updateUserCartID, user.clientId, user.password]);

        const requestCartItems = useCallback(async () => {
                try {
                        const items = await api.listCart(user.cartID);
                        setCart(items);
                } catch (error) {
                        throw error;
                }
        }, [user.cartID]);

        return { cart, requestCartID, requestCartItems };
}
