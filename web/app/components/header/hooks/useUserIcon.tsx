import { useState, useEffect } from "react";
import { UserState } from "../../../types";
import {
        AccountCircle,
        NoAccounts,
        EventBusy,
        CreditCardOff,
} from "@mui/icons-material";

export default function useUserIcon(userState: UserState) {
        const [userIcon, setUserIcon] = useState(<AccountCircle />);

        useEffect(() => {
                switch (userState) {
                        case UserState.ValidUser:
                                setUserIcon(<AccountCircle />);
                                break;
                        case UserState.InvalidUser:
                                setUserIcon(<NoAccounts />);
                                break;
                        case UserState.ExpiredCreditCardUser:
                                setUserIcon(<EventBusy />);
                                break;
                        case UserState.NoFundsCreditCardUser:
                                setUserIcon(<CreditCardOff />);
                                break;
                }
        }, [userState]);

        return userIcon;
}
