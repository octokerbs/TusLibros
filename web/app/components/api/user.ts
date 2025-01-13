export async function fetchCatalog(): Promise<Record<string, number>> {
        const response = await fetch("http://localhost:8080/listPurchases");
        if (!response.ok) {
                throw new Error("Failed to fetch user purchases");
        }
        const data = await response.json();
        return data.items; // Assuming the API response contains `items`
}
