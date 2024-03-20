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

                <Paper sx={{ margin: "1em", padding: "1em" }}>
                    <Typography variant="h4">NOTE</Typography>
                    <Typography variant="body1">
                        Cups are divided as follows:
                        <ul>
                            <li>Gold: Under 22 Seconds</li>
                            <li>Silver: 22-23 seconds</li>
                            <li>Bronze: 23+ seconds</li>
                        </ul>
                    </Typography>
                    <Typography variant="body1">
                        This website is still a work in progress and cup times
                        are not final, and the system is temporary.
                    </Typography>
                    <br />
                    <Typography variant="body1">
                        If you have any feedback please email me at
                        20068200@mail.wit.ie
                    </Typography>
                </Paper>
            </Container>
        </>
    );
}

export default App;
