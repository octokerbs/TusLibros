import { RemoveCircleOutline } from "@mui/icons-material";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import { Box, IconButton, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function BookCard() {
    return (
        <Card sx={{ width: "14vw" }}>
            <CardMedia
                sx={{ height: 140 }}
                image="/images/CardJitsu.jpeg"
                title="Book Cover"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Lizards
                </Typography>

                <Typography gutterBottom variant="h5" component="div">
                    $56.000
                </Typography>
            </CardContent>

            <CardActions sx={{ justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton>
                        <RemoveCircleOutline></RemoveCircleOutline>
                    </IconButton>
                    <Typography>0</Typography>
                    <IconButton>
                        <AddCircleOutline></AddCircleOutline>
                    </IconButton>
                </Box>
                <Button
                    sx={{
                        color: "white",
                        bgcolor: "#567568",
                        alignItems: "center",
                        marginLeft: "auto",
                    }}
                >
                    <Tooltip title="Add to cart">
                        <AddShoppingCart></AddShoppingCart>
                    </Tooltip>
                </Button>
            </CardActions>
        </Card>
    );
}
