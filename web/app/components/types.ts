export type Book = {
        name: string;
        isbn: string;
        price: string;
        imagePath: string;
};

export enum UserState {
        ValidUser,
        InvalidUser,
        ExpiredCreditCardUser,
        NoFundsCreditCardUser,
}

export type CartBookEntry = {
        book: Book;
        quantity: number;
        total: number;
};

export interface SnackbarState {
        open: boolean;
        vertical: "top" | "bottom";
        horizontal: "left" | "center" | "right";
}
