import { useCallback, useState } from "react";
import { api } from "../utils/api";

export default function useCart() {
    const [cart, setCart] = useState<Record<string, number>>({});
    const [cartID, setCartID] = useState<number>(-1);

    const requestCartID = useCallback(async () => {
        try {
            const cartID = await api.createCart("Octo", "Kerbs");
            setCartID(cartID);
            setCart({});
        } catch (error) {
            throw error;
        }
    }, []);

    const requestCartItems = useCallback(async () => {
        try {
            const items = await api.listCart(cartID);
            setCart(items);
        } catch (error) {
            throw error;
        }
    }, [cartID]);

    return { cart, cartID, requestCartID, requestCartItems };
}
