export const formatCurrency = (amount: number): string => {
    return amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
};

export const extractNumericPrice = (price: string): number => {
    return Number(price.replace(/[^0-9\.]+/g, ""));
};
