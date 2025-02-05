import * as React from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Leaderboard from "./components/Leaderboard";
import NavBar from "./components/NavBar";
import useMediaQuery from "@mui/material/useMediaQuery";

import "./index.css";

function App() {
    const isMobile = useMediaQuery("(max-width:600px)");

    return (
        <>
            <NavBar />

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
                    sx={{ margin: ".5em", width: isMobile ? "100%" : "85%" }}
                >
                    <Leaderboard />
                </Paper>
            </Container>
        </>
    );
}

export default App;
