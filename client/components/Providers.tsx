"use client";

import { UserProvider } from "../contexts/UserContext";
import { CartProvider } from "../contexts/CartContext";
import { UIProvider } from "../contexts/UIContext";

export function Providers({ children }: { children: React.ReactNode }) {
        return (
                <UIProvider>
                        <UserProvider>
                                <CartProvider>{children}</CartProvider>
                        </UserProvider>
                </UIProvider>
        );
}
