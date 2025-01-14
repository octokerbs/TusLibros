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
import { SlotPropsUser } from "./styles";
import { User, UserState } from "../Types/user";

const users: User[] = [
        {
                kind: "Usuario Valido",
                logo: <AccountCircle fontSize="small" />,
                state: UserState.ValidUser,
        },
        {
                kind: "Usuario Invalido",
                logo: <NoAccounts fontSize="small" />,
                state: UserState.InvalidUser,
        },
        {
                kind: "Usuario con tarjeta expirada",
                logo: <EventBusy fontSize="small" />,
                state: UserState.ExpiredCreditCardUser,
        },
        {
                kind: "Usuario sin fondos",
                logo: <CreditCardOff fontSize="small" />,
                state: UserState.NoFundsCreditCardUser,
        },
];

export default function UserMenu({
        anchorEl,
        open,
        handleClose,
        onUserStateChange,
        onOpenCompras,
}: {
        anchorEl: HTMLElement | null;
        open: boolean;
        handleClose: () => void;
        onUserStateChange: (newState: number) => void;
        onOpenCompras: () => void;
}) {
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

                        {users.map((user) => (
                                <MenuItem
                                        onClick={() =>
                                                onUserStateChange(user.state)
                                        }
                                        key={user.kind}
                                >
                                        <ListItemIcon>{user.logo}</ListItemIcon>
                                        {user.kind}
                                </MenuItem>
                        ))}
                </Menu>
        );
}
