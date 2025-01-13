import { CartBookEntry, SnackbarState, UserState } from "../types";

export type HeaderProps = {
        cartBooks: CartBookEntry[];
        total: string;
        onOpenCompras: () => void;
        userState: UserState;
        onUserStateChange: (newState: UserState) => void;
        onCheckout: (
                position: Pick<SnackbarState, "vertical" | "horizontal">
        ) => void;
        cartID: number;
};

export type CartProps = {
        anchorEl: HTMLElement | null;
        open: boolean;
        handleClose: () => void;
        cartBooks: CartBookEntry[];
        total: string;
        onCheckout: (
                position: Pick<SnackbarState, "vertical" | "horizontal">
        ) => void;
};

export type UserProps = {
        anchorEl: HTMLElement | null;
        open: boolean;
        handleClose: () => void;
        onUserStateChange: (newState: number) => void;
        onOpenCompras: () => void;
};
