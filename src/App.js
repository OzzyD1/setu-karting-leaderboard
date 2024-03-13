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
    } else if (student.time < 24) {
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
            <Paper sx={{ margin: "1em", padding: ".5em", color: "#4d4d4d" }}>
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
        </Container>
    );
}

export default App;
