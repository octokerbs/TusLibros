import { Book } from "../Types/cart";

const BASE_URL = "http://localhost:8080";

const defaultHeaders = {
    "Content-Type": "application/json",
};

async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
            `API Error: ${response.status} ${response.statusText} - ${errorText}`
        );
    }

    return response.json();
}

export const api = {
    async catalog(): Promise<Record<string, Book>> {
        const data = await apiRequest<{ items: Record<string, Book> }>(
            "/catalog"
        );
        return data.items;
    },

    async createCart(clientId: string, password: string): Promise<number> {
        const payload = { clientId, password };
        const data = await apiRequest<{ cartId: number }>("/createCart", {
            method: "POST",
            headers: defaultHeaders,
            body: JSON.stringify(payload),
        });
        return data.cartId;
    },

    async addToCart(
        cartId: number,
        isbn: string,
        quantity: number
    ): Promise<void> {
        const payload = {
            cartId,
            bookISBN: isbn,
            bookQuantity: quantity,
        };
        await apiRequest<void>("/addToCart", {
            method: "POST",
            headers: defaultHeaders,
            body: JSON.stringify(payload),
        });
    },

    async listCart(cartId: number): Promise<Record<string, number>> {
        const payload = { cartId };
        const data = await apiRequest<{
            items: Record<string, number>;
        }>("/listCart", {
            method: "POST",
            headers: defaultHeaders,
            body: JSON.stringify(payload),
        });
        return data.items;
    },

    async checkOutCart(
        cartId: number,
        ccNumber: string,
        ccExpirationDate: Date
    ): Promise<number> {
        const payload = {
            cartId,
            creditCardNumber: ccNumber,
            creditCardExpirationDate: ccExpirationDate,
        };
        const data = await apiRequest<{ transactionId: number }>(
            "/checkOutCart",
            {
                method: "POST",
                headers: defaultHeaders,
                body: JSON.stringify(payload),
            }
        );
        return data.transactionId;
    },

    async listPurchases(
        clientId: string,
        password: string
    ): Promise<Record<string, number>> {
        const payload = { clientId, password };
        const data = await apiRequest<{
            items: Record<string, number>;
        }>("/listPurchases", {
            method: "POST",
            headers: defaultHeaders,
            body: JSON.stringify(payload),
        });
        return data.items;
    },
};
