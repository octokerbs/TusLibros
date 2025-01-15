import {
        AccountCircle,
        CreditCardOff,
        EventBusy,
        NoAccounts,
} from "@mui/icons-material";
import { User } from "../Types/user";

export const DefaultUsers: User[] = [
        {
                clientId: "Octo",
                password: "Kerbs",
                cartID: -1,
                creditCardNumber: "1111222233334444",
                creditCardExpirationDate: new Date("2025-08-26T14:00:00Z"),
                kind: "Usuario Valido",
                logo: <AccountCircle />,
        },
        {
                clientId: "Hernan",
                password: "Wilkinson",
                cartID: -1,
                creditCardNumber: "1111222233334444",
                creditCardExpirationDate: new Date("2025-08-26T14:00:00Z"),
                kind: "Usuario Invalido",
                logo: <NoAccounts />,
        },
        {
                clientId: "Octo",
                password: "Kerbs",
                cartID: -1,
                creditCardNumber: "1111222233334444",
                creditCardExpirationDate: new Date("2001-08-26T14:00:00Z"),
                kind: "Usuario con tarjeta expirada",
                logo: <EventBusy />,
        },
        {
                clientId: "Octo",
                password: "Kerbs",
                cartID: -1,
                creditCardNumber: "0000000000000000",
                creditCardExpirationDate: new Date("2025-08-26T14:00:00Z"),
                kind: "Usuario sin fondos",
                logo: <CreditCardOff />,
        },
];
