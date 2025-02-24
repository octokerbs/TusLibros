'use client'

import {NotificationProvider} from "@/context/NotificationContext";
import Home from "../components/Home";
import {CartProvider} from "@/context/CartContext";
import {UserProvider} from "@/context/UserContext";

export default function TusLibros() {
    return (
        <NotificationProvider>
            <CartProvider>
                <UserProvider>
                    <Home/>
                </UserProvider>
            </CartProvider>
        </NotificationProvider>
    );
}