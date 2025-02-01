import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import logo from "../icons/logo.png";

const NavBar = () => {
    const isMobile = useMediaQuery("(max-width:600px)");

    return (
        <AppBar position="fixed" sx={{ backgroundColor: "#FDD154" }}>
            <Toolbar>
                <IconButton>
                    <img
                        src={logo}
                        alt="Karting Logo"
                        style={{ maxHeight: "50px" }}
                    />
                </IconButton>
                <Typography
                    variant={isMobile ? "h6" : "h3"}
                    sx={{
                        flexGrow: 1,
                        paddingLeft: ".2em",
                        margin: "0.1em",
                        color: "#414042",
                    }}
                >
                    SETU Karting Leaderboard
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
