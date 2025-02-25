import {useState} from "react";

export const usePurchases = () => {
    const [isPurchasesOpen, setIsPurchasesOpen] = useState(false);
    const handleOpenPurchases = () => {
        setIsPurchasesOpen(true);
    };
    const handleClosePurchases = () => {
        setIsPurchasesOpen(false);
    };

    return {isPurchasesOpen, handleOpenPurchases, handleClosePurchases};
};
