import React from "react";
import { Cup } from "../icons/Cup";
import drivers from "../drivers.js";
import { DataGrid } from "@mui/x-data-grid";

const sortedDrivers = drivers.sort((a, b) => a.time - b.time);

const getStudentClass = (student) => {
    if (student.time < 22) {
        return "gold";
    } else if (student.time < 23) {
        return "silver";
    } else {
        return "peru";
    }
};

const rows = drivers.map((student) => ({
    id: student.student_id,
    cup: getStudentClass(student),
    rank: sortedDrivers.indexOf(student) + 1,
    name: student.name,
    lapTime: student.time,
}));

const columns = [
    {
        field: "cup",
        headerName: "Cup",
        width: 160,
        renderCell: (params) => <Cup fill={params.row.cup} />,
    },
    { field: "rank", headerName: "Rank", width: 80 },
    { field: "name", headerName: "Name", width: 250 },
    { field: "lapTime", headerName: "Lap Time", width: 120 },
];

const Leaderboard = () => {
    return (
        <div>
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
                sx={{ fontSize: "1.2em" }}
            />
        </div>
    );
};

export default Leaderboard;
