import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function TitleButton() {
    return (
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
    );
}
