import { User } from "../Types/user";
import { api } from "../utils/api";

export default function useCheckout(
        user: User,
        cart: Record<string, number>,
        requestCartID: () => void,
        openSnackbar: () => void,
        updateAlert: (severity: "error" | "success", message: string) => void
) {
        const requestCheckout = async () => {
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
                } catch (error) {
                        updateAlert("error", error as string);
                }
        };

        const handleCheckout = async () => {
                if (Object.keys(cart).length === 0) return;

                await requestCheckout();
                await requestCartID();
                openSnackbar();
        };

        return { handleCheckout };
}
