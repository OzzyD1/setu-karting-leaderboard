import React, { useState } from "react";
import { Cup } from "../icons/Cup";
import drivers_sem1 from "../data/sem_1";
import drivers_sem2 from "../data/sem_2";
import { DataGrid } from "@mui/x-data-grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Tabs, Tab, Box, List, ListItem, Typography } from "@mui/material";

const Leaderboard = () => {
    const isMobile = useMediaQuery("(max-width:600px)");
    const [tabValue, setTabValue] = useState(0);
    const [selectedStudents, setSelectedStudents] = useState([]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const getCurrentDrivers = () => {
        const driverMap = new Map();
        switch (tabValue) {
            case 0:
                [...drivers_sem1, ...drivers_sem2].forEach((driver) => {
                    if (!driverMap.has(driver.student_id) || driverMap.get(driver.student_id).time > driver.time) {
                        driverMap.set(driver.student_id, driver);
                    }
                });
                break;
            case 1:
                drivers_sem1.forEach((driver) => {
                    driverMap.set(driver.student_id, driver);
                });
                break;
            case 2:
                drivers_sem2.forEach((driver) => {
                    driverMap.set(driver.student_id, driver);
                });
                break;
            default:
                return [];
        }
        return Array.from(driverMap.values());
    };

    const currentDrivers = getCurrentDrivers();
    const sortedDrivers = [...currentDrivers].sort((a, b) => a.time - b.time);
    const ranks = new Map(sortedDrivers.map((driver, index) => [driver.student_id, index + 1]));

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
            width: isMobile ? 60 : 160,
            renderCell: (params) => <Cup fill={params.row.cup} />,
        },
        { field: "rank", headerName: "Rank", width: isMobile ? 20 : 80 },
        { field: "name", headerName: "Name", width: isMobile ? 140 : 250 },
        { field: "lapTime", headerName: "Lap Time", width: isMobile ? 70 : 120 },
    ];

    const handleSelection = (selection) => {
        const selected = sortedDrivers.filter((student) => selection.includes(student.student_id));
        setSelectedStudents(selected);
    };

    const groupedStudents = selectedStudents.reduce((acc, student, index) => {
        const groupIndex = Math.floor(index / 7);
        if (!acc[groupIndex]) acc[groupIndex] = [];
        acc[groupIndex].push(student);
        return acc;
    }, []);

    return (
        <div>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
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
                checkboxSelection
                onRowSelectionModelChange={(newSelection) => handleSelection(newSelection)}
            />
            <Box sx={{ marginTop: 2 }}>
                <Typography variant="h6">Selected Students - Grouped by 7</Typography>
                {groupedStudents.map((group, index) => (
                    <Box key={index} sx={{ marginBottom: 2 }}>
                        <Typography variant="subtitle1">Group {index + 1}</Typography>
                        <List>
                            {group.map((student) => (
                                <ListItem key={student.student_id}>
                                    {student.name} - {student.time}s
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                ))}
            </Box>
        </div>
    );
};

export default Leaderboard;