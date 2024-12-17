import { ShoppingCartCheckout } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

export default function CartMenu({
    anchorEl,
    open,
    handleClose,
}: {
    anchorEl: HTMLElement | null;
    open: boolean;
    handleClose: () => void;
}) {
    return (
        <Menu
            anchorEl={anchorEl}
            id="cart-menu"
            open={open}
            onClose={handleClose}
            slotProps={{
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
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                    gutterBottom
                    variant="inherit"
                    component="div"
                    sx={{ marginLeft: "1vw", width: "20vw" }}
                    noWrap
                >
                    donde esta el productooooooooooo mamaguehooooooooo
                </Typography>
            </Box>

            <Divider />

            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                    gutterBottom
                    variant="inherit"
                    component="div"
                    sx={{ marginLeft: "1vw", width: "20vw" }}
                    noWrap
                >
                    productooooooooooooooooooooooooooooooooooooooooooo
                </Typography>
            </Box>

            <Divider />

            <Divider />
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{ marginLeft: "1vw" }}
                >
                    Total
                </Typography>
                <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{ marginLeft: "auto", marginRight: "1vw" }}
                >
                    $112.000
                </Typography>
            </Box>
            <Box display="flex" justifyContent={"center"}>
                <Button
                    sx={{
                        alignItems: "center",
                        bgcolor: "#567568",
                        color: "white",
                        width: "19vw",
                    }}
                >
                    <ShoppingCartCheckout></ShoppingCartCheckout>
                    <Typography sx={{ color: "white" }}>Checkout</Typography>
                </Button>
            </Box>
        </Menu>
    );
}
