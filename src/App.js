import * as React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Leaderboard from "./components/Leaderboard";
import NavBar from "./components/NavBar";

import "./index.css";

function App() {
    return (
        <>
            <NavBar />

            <Container
                maxWidth="md"
                sx={{
                    marginTop: "6em",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Paper sx={{ margin: "1em", width: "85%" }}>
                    <Leaderboard />
                </Paper>
            </Container>
        </>
    );
}

export default App;
