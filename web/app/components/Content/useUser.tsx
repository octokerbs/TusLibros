import { useCallback, useState } from "react";
import { api } from "../utils/api";
import { User, UserState } from "../Types/user";
import { DefaultUsers } from "../utils/localdb";

export default function useUser(
        updateAlert: (severity: "error" | "success", message: string) => void,
        openSnackbar: () => void,
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
                                updateCart({});
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
                        updateCart({});
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
                                updateCart(items);
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
                        updateAlert(
                                "success",
                                "Transaction #" +
                                        transactionID +
                                        " completed succesfully, thank you!"
                        );
                        updateCart({});
                } catch (error) {
                        handleError(error);
                }
        }, [
                handleError,
                updateAlert,
                updateCart,
                user.cartID,
                user.creditCardExpirationDate,
                user.creditCardNumber,
        ]);

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
                openSnackbar();
                await handleCreateCart(user);
        }, [cart, openSnackbar, handleCheckoutCart, handleCreateCart, user]);

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
