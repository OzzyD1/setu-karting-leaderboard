import * as React from "react";
import { Cup } from "./icons/Cup";
import leaderboard from "./leaderboard.js";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
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
        width: 100,
        renderCell: (params) => <Cup fill={params.row.cup} />,
    },
    { field: "name", headerName: "Name", width: 150 },
    { field: "lapTime", headerName: "Lap Time", width: 150 },
];

function App() {
    return (
        <div>
            <Typography variant="h2">SETU Karting Leaderboard</Typography>
            <div style={{ height: "100%", width: "100%" }}>
                <DataGrid
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
        </div>
    );
}

export default App;
