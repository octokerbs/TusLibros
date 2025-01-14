export enum UserState {
        ValidUser,
        InvalidUser,
        ExpiredCreditCardUser,
        NoFundsCreditCardUser,
}

export interface SnackbarState {
        open: boolean;
        vertical: "top" | "bottom";
        horizontal: "left" | "center" | "right";
}
