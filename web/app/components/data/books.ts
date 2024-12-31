import { Book } from "../types";

export const INITIAL_BOOKS: Record<string, Book> = {
    "978-1473225046": {
        name: "Mistborn: Secret History",
        isbn: "978-1473225046",
        price: "$20,820",
        imagePath: "/images/SecretHistory.jpg",
    },
    "978-0765316882": {
        name: "The Well Of Ascension",
        isbn: "978-0765316882",
        price: "$21,189",
        imagePath: "/images/TheWellOfAscension.jpg",
    },
    "978-0765378569": {
        name: "Shadows",
        isbn: "978-0765378569",
        price: "$17,584",
        imagePath: "/images/ShadowsOfSelf.jpg",
    },
};
