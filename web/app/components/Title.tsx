import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export default function Title() {
    return (
        <Link href="https://github.com/KerbsOD/TusLibros" target="_blank">
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
        </Link>
    );
}
