import { Button, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AccountCircle, ShoppingCart, Logout } from "@mui/icons-material";

export default function Header() {
  return (
    <Box sx={{ bgcolor: "#567568" }}>
      <Box
        sx={{
          height: "6vh",
          marginLeft: "20vw",
          marginRight: "20vw",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button>
          <Typography
            variant="h5"
            fontFamily="Poppins, sans-serif"
            fontWeight="bold"
            color="white"
          >
            TusLibros
          </Typography>
        </Button>
        <IconButton
          sx={{ marginLeft: "auto", marginRight: "1vw", color: "white" }}
        >
          <ShoppingCart />
        </IconButton>
        <IconButton sx={{ marginRight: "1vw", color: "white" }}>
          <AccountCircle />
        </IconButton>
        <IconButton sx={{ color: "white" }}>
          <Logout></Logout>
        </IconButton>
      </Box>
    </Box>
  );
}
