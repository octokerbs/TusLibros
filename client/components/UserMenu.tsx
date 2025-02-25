import History from "@mui/icons-material/History";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {useUser} from "@/context/UserContext";
import {LocalUsers, LocalUserStateTraits} from "@/utils/user";
import {useCart} from "@/context/CartContext";

const SlotPropsUser = {
    paper: {
        elevation: 0,
        sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
            },
            "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
            },
        },
    },
};

export default function UserMenu({
                                     anchorEl,
                                     open,
                                     handleClose,
                                     onOpenPurchases,
                                 }: {
    anchorEl: HTMLElement | null;
    open: boolean;
    handleClose: () => void;
    onOpenPurchases: () => void;
}) {
    const user = useUser();
    const cart = useCart();

    return (
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={SlotPropsUser}
            transformOrigin={{
                horizontal: "right",
                vertical: "top",
            }}
            anchorOrigin={{
                horizontal: "right",
                vertical: "bottom",
            }}
        >
            <MenuItem onClick={onOpenPurchases}>
                <ListItemIcon>
                    <History fontSize="small"/>
                </ListItemIcon>
                My Purchases
            </MenuItem>
            <Divider/>

            {LocalUsers.map((localUser) => (
                <MenuItem
                    onClick={async () => {
                        await user.handleNewUserStateWith(cart, localUser.state)
                    }}
                    key={localUser.state}
                >
                    <ListItemIcon>{LocalUserStateTraits[localUser.state].logo}</ListItemIcon>
                    {LocalUserStateTraits[localUser.state].name}
                </MenuItem>
            ))}
        </Menu>
    );
}
