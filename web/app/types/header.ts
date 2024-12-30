import { type ReactElement } from "react";
import type { CartBookEntry, UserState, SnackbarState } from "../types";

export interface HeaderProps {
        cartBooks: CartBookEntry[];
        total: string;
        onOpenCompras: () => void;
        userState: UserState;
        onUserStateChange: (newState: UserState) => void;
        onCheckout: (
                position: Pick<SnackbarState, "vertical" | "horizontal">
        ) => void;
}

export interface MenuState {
        anchorEl: HTMLElement | null;
        isOpen: boolean;
}
