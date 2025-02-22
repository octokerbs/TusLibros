import {useState} from "react";

export const useHeaderLogic = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [anchorElCart, setAnchorElCart] = useState<null | HTMLElement>(null);

    const handleClick =
        (menu: "user" | "cart") =>
            async (event: React.MouseEvent<HTMLElement>) => {
                if (menu === "user") {
                    setAnchorElUser(event.currentTarget);
                } else {
                    setAnchorElCart(event.currentTarget);
                }
            };

    const handleClose = (menu: "user" | "cart") => () => {
        if (menu === "user") {
            setAnchorElUser(null);
        } else {
            setAnchorElCart(null);
        }
    };

    return {anchorElUser, anchorElCart, handleClick, handleClose};
};
