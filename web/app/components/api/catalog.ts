import { Book } from "../types";

export async function fetchCatalog(): Promise<Record<string, Book>> {
        const response = await fetch("http://localhost:8080/catalog");
        if (!response.ok) {
                throw new Error("Failed to fetch catalog items");
        }
        const data = await response.json();
        return data.items;
}
