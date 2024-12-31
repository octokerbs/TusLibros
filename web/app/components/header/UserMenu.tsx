import History from "@mui/icons-material/History";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
    AccountCircle,
    CreditCardOff,
    EventBusy,
    NoAccounts,
} from "@mui/icons-material";
import { UserState } from "../types";
import { SlotPropsUser } from "./styles";
import { UserProps } from "./types";

export default function UserMenu({
    anchorEl,
    open,
    handleClose,
    onUserStateChange,
    onOpenCompras,
}: UserProps) {
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
            <MenuItem onClick={onOpenCompras}>
                <ListItemIcon>
                    <History fontSize="small" />
                </ListItemIcon>
                Mis compras
            </MenuItem>
            <Divider />

            <MenuItem onClick={() => onUserStateChange(UserState.ValidUser)}>
                <ListItemIcon>
                    <AccountCircle fontSize="small" />
                </ListItemIcon>
                Usuario Valido
            </MenuItem>
            <MenuItem onClick={() => onUserStateChange(UserState.InvalidUser)}>
                <ListItemIcon>
                    <NoAccounts fontSize="small" />
                </ListItemIcon>
                Usuario Invalido
            </MenuItem>
            <MenuItem
                onClick={() =>
                    onUserStateChange(UserState.ExpiredCreditCardUser)
                }
            >
                <ListItemIcon>
                    <EventBusy fontSize="small" />
                </ListItemIcon>
                Usuario con tarjeta expirada
            </MenuItem>
            <MenuItem
                onClick={() =>
                    onUserStateChange(UserState.NoFundsCreditCardUser)
                }
            >
                <ListItemIcon>
                    <CreditCardOff fontSize="small" />
                </ListItemIcon>
                Usuario sin fondos
            </MenuItem>
        </Menu>
    );
}
