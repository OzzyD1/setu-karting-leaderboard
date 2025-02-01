import React from "react";
import { Cup } from "../icons/Cup";
import drivers from "../data/drivers2425";
import { DataGrid } from "@mui/x-data-grid";
import useMediaQuery from "@mui/material/useMediaQuery";

const Leaderboard = () => {
    const isMobile = useMediaQuery("(max-width:600px)");

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
            width: isMobile ? 80 : 160,
            renderCell: (params) => <Cup fill={params.row.cup} />,
        },
        { field: "rank", headerName: "Rank", width: isMobile ? 20 : 80 },
        { field: "name", headerName: "Name", width: isMobile ? 150 : 250 },
        {
            field: "lapTime",
            headerName: "Lap Time",
            width: isMobile ? 90 : 120,
        },
    ];

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
                sx={isMobile ? null : { fontSize: "1.2em" }}
            />
        </div>
    );
};

export default Leaderboard;
