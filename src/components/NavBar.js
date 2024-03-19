import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const NavBar = () => {
    return (
        <AppBar position="fixed" sx={{ backgroundColor: "#FDD154" }}>
            <Toolbar>
                <Typography
                    variant="h3"
                    sx={{
                        flexGrow: 1,
                        paddingLeft: ".2em",
                        margin: "0.2em",
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
