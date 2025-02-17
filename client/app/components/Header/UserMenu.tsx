import History from "@mui/icons-material/History";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { SlotPropsUser } from "./styles";
import { DefaultUsers } from "../../../utils/localdb";

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
                                My Purchases
                        </MenuItem>
                        <Divider />

                        {DefaultUsers.map((user, index) => (
                                <MenuItem
                                        onClick={() => onUserStateChange(index)}
                                        key={user.kind}
                                >
                                        <ListItemIcon>{user.logo}</ListItemIcon>
                                        {user.kind}
                                </MenuItem>
                        ))}
                </Menu>
        );
}
