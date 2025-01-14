import { useCallback, useState } from "react";
import { api } from "../utils/api";
import { Book } from "../Types/cart";

export default function useCatalog() {
        const [catalog, setCatalog] = useState<Record<string, Book>>({});

        const requestCatalog = useCallback(async () => {
                try {
                        const items = await api.catalog();
                        setCatalog(items);
                } catch (error) {
                        console.error("Catalog initialization failed:", error);
                }
        }, []);

        return { catalog, requestCatalog };
}
