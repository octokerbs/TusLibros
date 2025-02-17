import { useState, useEffect, JSX } from "react";
import {
        AccountCircle,
        NoAccounts,
        EventBusy,
        CreditCardOff,
} from "@mui/icons-material";
import { UserState } from "../../../types/user";

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
