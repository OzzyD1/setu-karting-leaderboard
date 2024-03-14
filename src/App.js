import * as React from "react";
import { Cup } from "./icons/Cup";
import leaderboard from "./leaderboard.js";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const getStudentClass = (student) => {
    if (student.time < 22) {
        return "gold";
    } else if (student.time < 23) {
        return "silver";
    } else {
        return "peru";
    }
};

const rows = leaderboard.map((student) => ({
    id: student.student_id,
    cup: getStudentClass(student),
    name: student.name,
    lapTime: student.time,
}));

const columns = [
    {
        field: "cup",
        headerName: "Cup",
        width: 140,
        renderCell: (params) => <Cup fill={params.row.cup} />,
    },
    { field: "name", headerName: "Name", width: 160 },
    { field: "lapTime", headerName: "Lap Time", width: 100 },
];

function App() {
    return (
        <Container
            maxWidth="md"
            sx={{
                marginTop: "2em",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Paper sx={{ margin: "1em", padding: "0.5em" }}>
                <Typography variant="h2">SETU Karting Leaderboard</Typography>
            </Paper>

            <Paper sx={{ margin: "1em" }}>
                <div style={{ width: "100&" }}>
                    <DataGrid
                        autoHeight
                        rows={rows}
                        columns={columns}
                        sortModel={[
                            {
                                field: "lapTime",
                                sort: "asc",
                            },
                        ]}
                    />
                </div>
            </Paper>

            <Paper sx={{ margin: "1em", padding: "1em" }}>
                <Typography variant="h5">Note</Typography>
                <Typography variant="body1">
                    Cups are divided as follows:
                    <ul>
                        <li>Gold: Under 22 Seconds</li>
                        <li>Silver: 22-23 seconds</li>
                        <li>Bronze: 23+ seconds</li>
                    </ul>
                </Typography>
                <Typography variant="body1">
                    This website is still a work in progress and cup times are
                    not final, and the system is temporary.
                </Typography>
            </Paper>
        </Container>
    );
}

export default App;
