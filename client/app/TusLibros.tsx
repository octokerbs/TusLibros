'use client'

import {NotificationProvider} from "@/context/NotificationContext";
import Home from "../components/Home";

export default function TusLibros() {
    return (
        <NotificationProvider>
            <Home/>
        </NotificationProvider>
    );
}