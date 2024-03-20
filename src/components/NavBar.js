import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import logo from "../icons/logo.png";

const NavBar = () => {
    return (
        <AppBar position="fixed" sx={{ backgroundColor: "#FDD154" }}>
            <Toolbar>
                <IconButton>
                    <img
                        src={logo}
                        alt="Karting Logo"
                        style={{ maxHeight: "45px" }}
                    />
                </IconButton>
                <Typography
                    variant="h3"
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
