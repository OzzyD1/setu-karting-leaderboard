import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import logo from "../icons/logo.png";
import { FormControlLabel, Switch } from "@mui/material";

const NavBar = ({ showGroups, onGroupToggle }) => {
    const isMobile = useMediaQuery("(max-width:600px)");

    return (
        <AppBar position="fixed" sx={{ backgroundColor: "#FDD154" }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <IconButton>
                    <img
                        src={logo}
                        alt="Karting Logo"
                        style={{ maxHeight: isMobile ? "35px" : "50px" }}
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
                <FormControlLabel
                    control={
                        <Switch
                            checked={showGroups}
                            onChange={onGroupToggle}
                            sx={{ color: "white" }}
                        />
                    }
                    label="Group Generator"
                    sx={{ color: "black" }}
                />
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
