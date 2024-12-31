import { useState, useEffect, JSX } from "react";
import { UserState } from "../../types";
import {
    AccountCircle,
    NoAccounts,
    EventBusy,
    CreditCardOff,
} from "@mui/icons-material";

const icons: JSX.Element[] = [
    <AccountCircle key="ValidUser" />,
    <NoAccounts key="InvalidUser" />,
    <EventBusy key="ExpiredCreditCardUser" />,
    <CreditCardOff key="NoFundsCreditCardUser" />,
];

export const useUserIcon = (userState: UserState) => {
    const [userIcon, setUserIcon] = useState(<AccountCircle />);

    useEffect(() => {
        setUserIcon(icons[userState]);
    }, [userState]);

    return userIcon;
};
