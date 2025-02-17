import { useCallback, useState } from "react";
import { api } from "../../../utils/api";
import { Book } from "../../../types/cart";

export default function useCatalog(handleError: (error: unknown) => void) {
        const [catalog, setCatalog] = useState<Record<string, Book>>({});

        const requestCatalog = useCallback(async () => {
                try {
                        const items = await api.catalog();
                        setCatalog(items);
                } catch (error) {
                        handleError(error);
                }
        }, [handleError]);

        return { catalog, requestCatalog };
}
