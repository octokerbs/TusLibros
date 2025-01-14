import { JSX } from "react";

export enum UserState {
        ValidUser,
        InvalidUser,
        ExpiredCreditCardUser,
        NoFundsCreditCardUser,
}

export type User = {
        kind: string;
        logo: JSX.Element;
        state: UserState;
};

export interface SnackbarState {
        open: boolean;
        vertical: "top" | "bottom";
        horizontal: "left" | "center" | "right";
}
