import {JSX} from "react";
import {AccountCircle, CreditCardOff, EventBusy, NoAccounts} from "@mui/icons-material";

export enum UserState {
    ValidUser,
    InvalidUser,
    ExpiredCreditCardUser,
    NoFundsCreditCardUser,
}

export type UserStateTraits = {
    name: string;
    logo: JSX.Element;
}

export type User = {
    state: UserState;
    clientId: string;
    password: string;
    cartID: number;
    creditCardNumber: string;
    creditCardExpirationDate: Date;
};

export const LocalUserStateTraits: UserStateTraits[] = [
    {
        name: "Valid user",
        logo: <AccountCircle/>,
    },
    {
        name: "Invalid User",
        logo: <NoAccounts/>,
    },
    {
        name: "Expired Credit Card User",
        logo: <EventBusy/>,
    },
    {
        name: "Broke User",
        logo: <CreditCardOff/>,
    }
]

export const LocalUsers: User[] = [
    {
        state: UserState.ValidUser,
        clientId: "Octo",
        password: "Kerbs",
        cartID: -1,
        creditCardNumber: "1111222233334444",
        creditCardExpirationDate: new Date("2030-08-26T14:00:00Z"),
    },
    {
        state: UserState.InvalidUser,
        clientId: "Octo",
        password: "Krebs",
        cartID: -1,
        creditCardNumber: "1111222233334444",
        creditCardExpirationDate: new Date("2030-08-26T14:00:00Z"),
    },
    {
        state: UserState.ExpiredCreditCardUser,
        clientId: "Norberto",
        password: "Lining",
        cartID: -1,
        creditCardNumber: "1111222233334444",
        creditCardExpirationDate: new Date("2001-08-26T14:00:00Z"),
    },
    {
        state: UserState.NoFundsCreditCardUser,
        clientId: "Hernan",
        password: "Wilkinson",
        cartID: -1,
        creditCardNumber: "0000000000000000",
        creditCardExpirationDate: new Date("2030-08-26T14:00:00Z"),
    },
];
