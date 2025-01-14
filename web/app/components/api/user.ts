export async function getPurchases(
        clientId: string,
        password: string
): Promise<Record<string, number>> {
        const response = await fetch("http://localhost:8080/listPurchases", {
                method: "GET",
                headers: {
                        "Content-Type": "application/json",
                },
                body: JSON.stringify({
                        clientId: clientId,
                        password: password,
                }),
        });
        if (!response.ok) {
                throw new Error("Failed to fetch user purchases");
        }
        const data = await response.json();
        return data.items; // Assuming the API response contains `items`
}
