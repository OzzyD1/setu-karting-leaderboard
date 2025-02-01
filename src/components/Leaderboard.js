import React, { useState } from "react";
import { Cup } from "../icons/Cup";
import drivers_sem1 from "../data/sem_1";
import drivers_sem2 from "../data/sem_2";
import { DataGrid } from "@mui/x-data-grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Tabs, Tab, Box } from "@mui/material";

const Leaderboard = () => {
    const isMobile = useMediaQuery("(max-width:600px)");
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const getCurrentDrivers = () => {
        // Create map to store fastest time per student
        const driverMap = new Map();

        switch (tabValue) {
            case 0: // Overall
                // Combine both semesters, keeping best time per student
                [...drivers_sem1, ...drivers_sem2].forEach((driver) => {
                    if (
                        !driverMap.has(driver.student_id) ||
                        driverMap.get(driver.student_id).time > driver.time
                    ) {
                        driverMap.set(driver.student_id, driver);
                    }
                });
                break;
            case 1: // Semester 1
                drivers_sem1.forEach((driver) => {
                    driverMap.set(driver.student_id, driver);
                });
                break;
            case 2: // Semester 2
                drivers_sem2.forEach((driver) => {
                    driverMap.set(driver.student_id, driver);
                });
                break;
            default: // Handle unexpected tab values
                return [];
        }
        return Array.from(driverMap.values());
    };

    const currentDrivers = getCurrentDrivers();
    // Create stable sort for drivers
    const sortedDrivers = [...currentDrivers].sort((a, b) => a.time - b.time);

    // Create ranks based on sorted array
    const ranks = new Map(
        sortedDrivers.map((driver, index) => [driver.student_id, index + 1])
    );

    const getStudentClass = (student) => {
        if (student.time < 22) {
            return "gold";
        } else if (student.time < 23) {
            return "silver";
        } else {
            return "peru";
        }
    };

    const rows = currentDrivers.map((student) => ({
        id: student.student_id,
        cup: getStudentClass(student),
        rank: ranks.get(student.student_id),
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
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                    <Tab label="Overall" />
                    <Tab label="Semester 1" />
                    <Tab label="Semester 2" />
                </Tabs>
            </Box>
            <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                sortModel={[{ field: "lapTime", sort: "asc" }]}
                sx={isMobile ? null : { fontSize: "1.2em" }}
            />
        </div>
    );
};

export default Leaderboard;
