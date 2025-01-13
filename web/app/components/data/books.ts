import { Book } from "../types";

// export const CATALOG: Record<string, Book> = {
//     "978-1473225046": {
//         name: "Mistborn: Secret History",
//         isbn: "978-1473225046",
//         price: "$20,820",
//         imagePath: "/images/SecretHistory.jpg",
//     },
//     "978-0765316882": {
//         name: "The Well Of Ascension",
//         isbn: "978-0765316882",
//         price: "$21,189",
//         imagePath: "/images/TheWellOfAscension.jpg",
//     },
//     "978-0765378569": {
//         name: "Shadows",
//         isbn: "978-0765378569",
//         price: "$17,584",
//         imagePath: "/images/ShadowsOfSelf.jpg",
//     },
// };

export async function fetchBooks(): Promise<Record<string, Book>> {
    const response = await fetch("http://localhost:8080/catalog");
    if (!response.ok) {
        throw new Error("Failed to fetch books");
    }
    const data = await response.json();
    return data.items; // Assuming the API response contains `items`
}
