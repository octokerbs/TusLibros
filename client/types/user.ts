import { JSX } from "react";

export enum UserState {
        ValidUser,
        InvalidUser,
        ExpiredCreditCardUser,
        NoFundsCreditCardUser,
}

export type User = {
        clientId: string;
        password: string;
        cartID: number;
        creditCardNumber: string;
        creditCardExpirationDate: Date;
        kind: string;
        logo: JSX.Element;
};

export interface SnackbarState {
        open: boolean;
        vertical: "top" | "bottom";
        horizontal: "left" | "center" | "right";
}
