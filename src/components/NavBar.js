import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import logo from "../icons/logo.png";
import {
    FormControlLabel,
    Switch,
    Select,
    MenuItem,
    FormControl,
    Box,
} from "@mui/material";
import { academicYears } from "../data/getCurrentYear";

const NavBar = ({ showGroups, onGroupToggle, selectedYear, onYearChange }) => {
    const isMobile = useMediaQuery("(max-width:600px)");

    return (
        <AppBar position="fixed" sx={{ backgroundColor: "#2cc5f4" }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <IconButton>
                    <img
                        src={logo}
                        alt="Karting Logo"
                        style={{ maxHeight: isMobile ? "35px" : "50px" }}
                    />
                </IconButton>
                <Typography
                    variant={isMobile ? "h9" : "h4"}
                    sx={{
                        flexGrow: 1,
                        paddingLeft: ".2em",
                        margin: "0.1em",
                        color: "#414042",
                    }}
                >
                    SETU Waterford Karting Leaderboard
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {/* Academic Year Selector */}
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                        <Select
                            value={selectedYear}
                            onChange={(e) => onYearChange(e.target.value)}
                            sx={{
                                color: "black",
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "black",
                                },
                            }}
                        >
                            {Object.keys(academicYears).map((year) => (
                                <MenuItem key={year} value={year}>
                                    {academicYears[year].label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Group Generator Toggle */}
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
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
