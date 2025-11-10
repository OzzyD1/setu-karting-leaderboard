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

    // Determine the content based on screen size
    const titleContent = isMobile ? (
        <>
            SETU Waterford
            <br />
            {/* The span uses a CSS class defined in index.css to be smaller */}
            <span className="mobile-subtitle">Karting Leaderboard</span>
        </>
    ) : (
        "SETU Waterford - Karting Leaderboard"
    );


    return (
        <AppBar position="fixed" sx={{ backgroundColor: "#f8f9fa", borderBottom: '1px solid #dee2e6' }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <IconButton>
                    <img
                        src={logo}
                        alt="Karting Logo"
                        // SLIGHTLY SMALLER LOGO ON MOBILE
                        style={{ maxHeight: isMobile ? "30px" : "50px" }}
                    />
                </IconButton>
                <Typography
                    variant={isMobile ? "h9" : "h4"}
                    // Using the established mobile class for the overall text block
                    className={isMobile ? "nav-text-mobile" : ""}
                    sx={{
                        flexGrow: 1,
                        // Reduced padding left on mobile
                        paddingLeft: isMobile ? "0.1em" : ".2em",
                        margin: 0,
                        color: "#333333",
                        lineHeight: isMobile ? 1.1 : 'inherit', // Adjust line height for stacked text
                    }}
                >
                    {titleContent}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: isMobile ? 1 : 2 }}>
                    {/* Academic Year Selector */}
                    <FormControl size="small" sx={{
                        // REDUCED MIN WIDTH ON MOBILE
                        minWidth: isMobile ? 60 : 120
                    }}>
                        <Select
                            value={selectedYear}
                            onChange={(e) => onYearChange(e.target.value)}
                            sx={{
                                color: "#333333",
                                backgroundColor: "#e9ecef",
                                '.MuiSelect-icon': { color: '#333333' },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e9ecef",
                                },
                                fontSize: isMobile ? '0.7em' : '1em'
                            }}
                        >
                            {Object.keys(academicYears).map((year) => (
                                <MenuItem key={year} value={year}>
                                    {academicYears[year].label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Group Generator Toggle (FIXED HOVER EFFECT) */}
                    <FormControlLabel
                        control={
                            <Switch
                                checked={showGroups}
                                onChange={onGroupToggle}
                                sx={{
                                    margin: 0,
                                    '& .MuiSwitch-thumb': {
                                        color: showGroups ? '#007bff' : '#ffffff',
                                        width: isMobile ? 12 : 15,
                                        height: isMobile ? 12 : 15
                                    },
                                    '& .MuiSwitch-track': { backgroundColor: showGroups ? 'rgba(0, 123, 255, 0.5)' : '#adb5bd' },
                                    '& .MuiSwitch-switchBase': { padding: isMobile ? 2 : 4 },
                                }}
                            />
                        }
                        // EMPTY LABEL - Text is removed
                        label={<span style={{ display: 'none' }}>Group Generator</span>}
                        sx={{
                            color: "#333333",
                            margin: isMobile ? '0 4px 0 0' : '0 8px 0 0',
                            // --- FIX FOR DESKTOP HOVER MISALIGNMENT ---
                            '&:hover': {
                                backgroundColor: 'transparent', // Remove the gray hover background
                                cursor: 'pointer',             // Keep the pointer cursor
                            },
                            // Target the inner component that handles the ripple/focus state
                            '& .MuiButtonBase-root': {
                                padding: 0,
                                margin: 0,
                                '&:hover': {
                                    backgroundColor: 'transparent', // Ensure button base is also transparent on hover
                                },
                            }
                            // ------------------------------------------
                        }}
                    />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;