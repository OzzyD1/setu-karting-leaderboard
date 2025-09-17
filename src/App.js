import { useState } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Leaderboard from "./components/Leaderboard";
import GroupGenerator from "./components/GroupGenerator";
import NavBar from "./components/NavBar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getCurrentAcademicYear } from "./data/getCurrentYear";

import "./index.css";

function App() {
    const isMobile = useMediaQuery("(max-width:600px)");
    const [showGroups, setShowGroups] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [selectedYear, setSelectedYear] = useState(getCurrentAcademicYear());

    const handleGroupToggle = (e) => {
        setShowGroups(e.target.checked);
        if (!e.target.checked) {
            setSelectedStudents([]);
        }
    };

    const handleYearChange = (year) => {
        setSelectedYear(year);
        setSelectedStudents([]); // Clear selections when year changes
    };

    return (
        <>
            <NavBar
                showGroups={showGroups}
                onGroupToggle={handleGroupToggle}
                selectedYear={selectedYear}
                onYearChange={handleYearChange}
            />
            <Container
                maxWidth="md"
                sx={{
                    marginTop: isMobile ? "4.5em" : "6em",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Paper
                    sx={{ margin: ".5em", width: isMobile ? "100%" : "100%" }}
                >
                    <Leaderboard
                        showGroups={showGroups}
                        selectedStudents={selectedStudents}
                        setSelectedStudents={setSelectedStudents}
                        selectedYear={selectedYear}
                    />
                    <GroupGenerator
                        showGroups={showGroups}
                        selectedStudents={selectedStudents}
                    />
                </Paper>
            </Container>
        </>
    );
}

export default App;
