import { Book } from "../types";

export async function getCatalog(): Promise<Record<string, Book>> {
        const response = await fetch("http://localhost:8080/catalog");
        if (!response.ok) {
                throw new Error("Failed to fetch catalog items");
        }
        const data = await response.json();
        return data.items;
}

export async function createCart(): Promise<number> {
        const clientId = "Octo";
        const password = "Kerbs";

        const response = await fetch("http://localhost:8080/createCart", {
                method: "POST",
                headers: {
                        "Content-Type": "application/json",
                },
                body: JSON.stringify({
                        clientId: clientId,
                        password: password,
                }),
        });

        if (!response.ok) {
                throw new Error("Failed to create cart");
        }

        const data = await response.json();
        return data.cartId;
}

export async function addToCart(
        cartID: number,
        isbn: string,
        quantity: number
) {
        const response = await fetch("http://localhost:8080/addToCart", {
                method: "POST",
                headers: {
                        "Content-Type": "application/json",
                },

                body: JSON.stringify({
                        cartId: cartID,
                        bookISBN: isbn,
                        bookQuantity: quantity,
                }),
        });

        if (!response.ok) {
                throw new Error("Failed to add item to cart");
        }
}

export async function listCart(
        cartID: number
): Promise<Record<string, number>> {
        const response = await fetch("http://localhost:8080/listCart", {
                method: "POST",
                headers: {
                        "Content-Type": "application/json",
                },
                body: JSON.stringify({ cartId: cartID }),
        });

        if (!response.ok) {
                throw new Error("Failed to fetch cart");
        }
        const data = await response.json();
        return data.items;
}

export async function checkOutCart(
        cartID: number,
        ccNumber: string,
        ccExpirationDate: Date
): Promise<number> {
        const response = await fetch("http://localhost:8080/checkOutCart", {
                method: "POST",
                headers: {
                        "Content-Type": "application/json",
                },
                body: JSON.stringify({
                        cartId: cartID,
                        creditCardNumber: ccNumber,
                        creditCardExpirationDate: ccExpirationDate,
                }),
        });
        if (!response.ok) {
                throw new Error("Failed to checkout cart");
        }
        const data = await response.json();
        return data.transactionId;
}

export async function getPurchases(
        clientId: string,
        password: string
): Promise<Record<string, number>> {
        const response = await fetch("http://localhost:8080/listPurchases", {
                method: "POST",
                headers: {
                        "Content-Type": "application/json",
                },
                body: JSON.stringify({
                        clientId: clientId,
                        password: password,
                }),
        });
        if (!response.ok) {
                throw new Error("Failed to fetch user purchases");
        }
        const data = await response.json();
        return data.items;
}
