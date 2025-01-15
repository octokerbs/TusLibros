import { Box, Button, styled } from "@mui/material";

export const AddToCartButton = styled(Button)(({ theme }) => ({
    color: "white",
    backgroundColor: theme.palette.primary.main,
    alignItems: "center",
    marginLeft: "auto",
}));

export const GridBox = styled(Box)(({}) => ({
    marginTop: "8vh",
    marginBottom: "2vh",
    marginLeft: "20vw",
    marginRight: "20vw",
}));
