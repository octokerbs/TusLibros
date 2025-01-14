import Box from "@mui/material/Box/Box";
import styled from "@mui/material/styles/styled";

export const OutsideComprasBox = styled(Box)(({}) => ({
        position: "absolute",
        height: "80vh",
        width: "60vw",
        marginLeft: "20vw",
        marginRight: "20vw",
        marginTop: "8vh",
        backgroundColor: "white",
        borderRadius: "10px",
        p: 4,
}));

export const InsideComprasBox = styled(Box)(({}) => ({
        marginTop: "4vh",
        marginBotom: "4vh",
        marginLeft: "2vw",
        marginRight: "2vw",
}));

export const ItemComprasBox = styled(Box)(({}) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "1vh",
        marginBottom: "1vh",
        marginLeft: "1vw",
        marginRight: "1vw",
        width: "55vw",
}));
