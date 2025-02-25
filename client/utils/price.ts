import {Book} from "@/utils/book";

export function calculateTotal(
    cart: Record<string, number>,
    catalog: Record<string, Book>
): number {
    let total = 0;
    Object.keys(cart).map((item) => {
        const book = catalog[item];
        const quantity = cart[item];
        total += book.price * quantity;
    });

    return total;
}
