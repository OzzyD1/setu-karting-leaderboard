import { useState } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { ThemeProvider, createTheme } from '@mui/material/styles';
// Removed all conflicting: import "@fontsource/roboto/X.css";

import Leaderboard from "./components/Leaderboard";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getCurrentAcademicYear } from "./data/getCurrentYear";

import "./index.css";

// 1. DEFINE YOUR CUSTOM THEME
// This tells Material UI to use your custom font for all its Typography components
const theme = createTheme({
    typography: {
        fontFamily: [
            'Formula1-Regular', // <-- Your custom font name
            'Arial',
            'sans-serif',
        ].join(','),
    },
});

function App() {
    const isMobile = useMediaQuery("(max-width:600px)");
    const [selectedYear, setSelectedYear] = useState(getCurrentAcademicYear());

    const handleYearChange = (year) => {
        setSelectedYear(year);
    };

    return (
        // 2. WRAP YOUR APP IN THE THEME PROVIDER
        <ThemeProvider theme={theme}>
            <NavBar
                selectedYear={selectedYear}
                onYearChange={handleYearChange}
            />
            <Hero year={selectedYear} />
            <Container
                maxWidth="md"
                sx={{
                    marginTop: isMobile ? "0.5em" : "1em",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Paper
                    // The Paper is now transparent due to the CSS changes
                    sx={{ margin: ".5em", width: isMobile ? "100%" : "100%" }}
                >
                    <Leaderboard selectedYear={selectedYear} />
                </Paper>
            </Container>
        </ThemeProvider>
    );
}

export default App;