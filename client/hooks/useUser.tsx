import {useCallback, useState} from "react";
import {api} from "../utils/api";
import {User, UserState} from "../types/user";
import {DefaultUsers} from "../utils/localdb";

export default function useUser(
    handleSuccess: (message: string) => void,
    handleError: (error: unknown) => void
) {
    const [purchases, setPurchases] = useState<Record<string, number>>({});
    const [cart, setCart] = useState<Record<string, number>>({});
    const [user, setUser] = useState<User>(
        DefaultUsers[UserState.ValidUser]
    );

    const updateCart = useCallback(
        async (items: Record<string, number>) => {
            setCart(items);
        },
        []
    );

    const updateUserCartID = useCallback((cartID: number) => {
        setUser((prevUser) => ({
            ...prevUser,
            cartID: cartID,
        }));
    }, []);

    const handleCreateCart = useCallback(
        async (currentUser: User) => {
            try {
                const cartID = await api.createCart(
                    currentUser.clientId,
                    currentUser.password
                );
                updateUserCartID(cartID);
                await updateCart({});
            } catch (error) {
                handleError(error);
            }
        },
        [handleError, updateCart, updateUserCartID]
    );

    const updateUserState = useCallback(
        async (state: UserState) => {
            const newUser = DefaultUsers[state];
            setUser(newUser);
            await updateCart({});
            setPurchases({});
            await handleCreateCart(newUser);
        },
        [handleCreateCart, updateCart]
    );

    const handleAddToCart = useCallback(
        async (
            isbn: string,
            counter: number,
            restartCounter: () => void
        ) => {
            try {
                await api.addToCart(user.cartID, isbn, counter);
                const items = await api.listCart(user.cartID);
                await updateCart(items);
            } catch (error) {
                handleError(error);
            }
            restartCounter();
        },
        [handleError, updateCart, user.cartID]
    );

    const handleCheckoutCart = useCallback(async () => {
        try {
            const transactionID = await api.checkOutCart(
                user.cartID,
                user.creditCardNumber,
                user.creditCardExpirationDate
            );
            handleSuccess("Transaction #" +
                transactionID +
                " completed successfully, thank you!")
            await updateCart({});
        } catch (error) {
            handleError(error);
        }
    }, [handleError, handleSuccess, updateCart, user.cartID, user.creditCardExpirationDate, user.creditCardNumber]);

    const handleListPurchases = useCallback(async () => {
        try {
            const purchases = await api.listPurchases(
                user.clientId,
                user.password
            );
            setPurchases(purchases);
        } catch (error) {
            handleError(error);
        }
    }, [handleError, user.clientId, user.password]);

    const finishTransaction = useCallback(async () => {
        if (Object.keys(cart).length === 0) return;

        await handleCheckoutCart();
        await handleCreateCart(user);
    }, [cart, handleCheckoutCart, handleCreateCart, user]);

    return {
        cart,
        user,
        purchases,
        updateUserState,
        handleListPurchases,
        finishTransaction,
        handleAddToCart,
    };
}
