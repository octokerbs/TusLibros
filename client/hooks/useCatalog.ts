import {useCallback, useState} from "react";
import {api} from "@/api/api";
import {useNotification} from "@/context/NotificationContext";
import {Book} from "@/utils/book";

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
