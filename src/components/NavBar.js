import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import logo from "../icons/logo.png";
import GroupsIcon from "@mui/icons-material/Groups";
import {
    Button,
    Select,
    MenuItem,
    FormControl,
    Box,
} from "@mui/material";
import { academicYears } from "../data/getCurrentYear";

const NavBar = ({ selectedYear, onYearChange }) => {
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

                    {/* Link to the group builder page */}
                    {isMobile ? (
                        <IconButton
                            component="a"
                            href={`${process.env.PUBLIC_URL}/groups.html`}
                            aria-label="Group builder"
                            title="Group builder"
                            sx={{ color: "#007bff" }}
                        >
                            <GroupsIcon />
                        </IconButton>
                    ) : (
                        <Button
                            component="a"
                            href={`${process.env.PUBLIC_URL}/groups.html`}
                            startIcon={<GroupsIcon />}
                            sx={{ color: "#007bff", fontWeight: "bold" }}
                        >
                            Groups
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;