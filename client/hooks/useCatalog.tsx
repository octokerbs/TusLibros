import {useCallback, useState} from "react";
import {api} from "@/utils/api";
import {Book} from "@/types/cart";
import {useNotification} from "@/context/NotificationContext";

export default function useCatalog() {
    const notification = useNotification();
    const [catalog, setCatalog] = useState<Record<string, Book>>({});

    const requestCatalog = useCallback(async () => {
        try {
            const items = await api.catalog();
            setCatalog(items);
        } catch (e) {
            notification.handleError(e);
        }
    }, [notification]);

    return {catalog, requestCatalog};
}
