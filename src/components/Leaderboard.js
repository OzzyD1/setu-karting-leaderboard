import React, { useState } from "react";
import { Cup } from "../icons/Cup";
import drivers_sem1 from "../data/sem_1";
import drivers_sem2 from "../data/sem_2";
import { DataGrid } from "@mui/x-data-grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Tabs, Tab, Box, Typography, Paper, Grid } from "@mui/material";

const Leaderboard = ({ showGroups, selectedStudents, setSelectedStudents }) => {
    const isMobile = useMediaQuery("(max-width:600px)");
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const getCurrentDrivers = () => {
        const driverMap = new Map();
        switch (tabValue) {
            case 0:
                [...drivers_sem1, ...drivers_sem2].forEach((driver) => {
                    if (
                        !driverMap.has(driver.student_id) ||
                        driverMap.get(driver.student_id).time > driver.time
                    ) {
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
            width: isMobile ? 60 : 160,
            renderCell: (params) => <Cup fill={params.row.cup} />,
        },
        { field: "rank", headerName: "Rank", width: isMobile ? 20 : 80 },
        { field: "name", headerName: "Name", width: isMobile ? 140 : 250 },
        {
            field: "lapTime",
            headerName: "Lap Time",
            width: isMobile ? 70 : 120,
        },
    ];

    const handleSelection = (selection) => {
        if (!showGroups) return;
        const selected = sortedDrivers.filter((student) =>
            selection.includes(student.student_id)
        );
        setSelectedStudents(selected);
    };

    const generateGroups = () => {
        const sortedDrivers = [...selectedStudents].sort(
            (a, b) => b.time - a.time
        );
        const groups = [];
        for (let i = 0; i < sortedDrivers.length; i += 7) {
            groups.push(sortedDrivers.slice(i, i + 7));
        }
        return groups;
    };

    const renderGroups = () => {
        if (!showGroups || selectedStudents.length === 0) return null;

        const groups = generateGroups();

        return (
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Racing Groups
                </Typography>
                <Grid container spacing={3}>
                    {groups.map((group, groupIndex) => (
                        <Grid item xs={12} md={6} lg={4} key={groupIndex}>
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 2,
                                    backgroundColor: (theme) =>
                                        theme.palette.grey[100],
                                }}
                            >
                                <Typography variant="h6" gutterBottom>
                                    Group {groupIndex + 1}
                                </Typography>
                                {group.map((driver, index) => (
                                    <Box
                                        key={driver.id}
                                        sx={{
                                            p: 1,
                                            mb: 1,
                                            backgroundColor: "white",
                                            borderRadius: 1,
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Typography>
                                            {index + 1}. {driver.name}
                                        </Typography>
                                        <Typography>{driver.time}s</Typography>
                                    </Box>
                                ))}
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="fullWidth"
                >
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
                checkboxSelection={showGroups}
                onRowSelectionModelChange={(newSelection) =>
                    handleSelection(newSelection)
                }
            />
            {renderGroups()}
        </Box>
    );
};

export default Leaderboard;
