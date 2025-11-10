/**
 * Leaderboard Component
 *
 * Displays karting lap times in a tabbed interface with three views:
 * - Overall: Combined best times from both semesters
 * - Semester 1: Only semester 1 times
 * - Semester 2: Only semester 2 times
 *
 * Features:
 * - Clean, minimalist light theme layout
 * - Responsive design
 * - Sorting ability REMOVED from all columns
 */

import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { academicYears } from "../data/getCurrentYear";

// Helper to format the time to three decimal places
const formatTime = (time) => {
    if (typeof time !== 'number' || isNaN(time)) return '';
    return time.toFixed(3);
};

const Leaderboard = ({
                         showGroups,
                         selectedStudents,
                         setSelectedStudents,
                         selectedYear,
                     }) => {
    // Detect mobile screen size for responsive layout
    const isMobile = useMediaQuery("(max-width:600px)");

    // Tab state: 0=Overall, 1=Semester 1, 2=Semester 2
    const [tabValue, setTabValue] = useState(0);

    const handleSelection = (selection) => {
        if (!showGroups) return;
        const selected = sortedDrivers.filter((student) =>
            selection.includes(student.student_id)
        );
        setSelectedStudents(selected);
    };

    const renderGroups = () => {
        return null;
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const getCurrentDrivers = () => {
        const yearData = academicYears[selectedYear];
        if (!yearData) return [];

        const drivers_sem1 = yearData.sem1 || [];
        const drivers_sem2 = yearData.sem2 || [];

        const driverMap = new Map();
        switch (tabValue) {
            case 0: // Overall
                [...drivers_sem1, ...drivers_sem2].forEach((driver) => {
                    if (
                        !driverMap.has(driver.student_id) ||
                        driverMap.get(driver.student_id).time > driver.time
                    ) {
                        driverMap.set(driver.student_id, driver);
                    }
                });
                break;
            case 1: // Semester 1 only
                drivers_sem1.forEach((driver) => {
                    driverMap.set(driver.student_id, driver);
                });
                break;
            case 2: // Semester 2 only
                drivers_sem2.forEach((driver) => {
                    driverMap.set(driver.student_id, driver);
                });
                break;
            default:
                return [];
        }
        return Array.from(driverMap.values());
    };

    // Get current dataset and calculate rankings
    const currentDrivers = getCurrentDrivers();
    const sortedDrivers = [...currentDrivers].sort((a, b) => a.time - b.time);

    // Get the best time (Lap Time of the leader)
    const bestTime = sortedDrivers.length > 0 ? sortedDrivers[0].time : 0;
    const formattedBestTime = formatTime(bestTime);

    // Create rank mapping: student_id -> rank position (1-based)
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

    /**
     * Transform driver data into DataGrid row format
     */
    const rows = currentDrivers.map((student) => ({
        id: student.student_id,
        rank: ranks.get(student.student_id),
        name: student.name,
        lapTime: formatTime(student.time),
        // Calculate gap: blank for the leader, otherwise +[difference]
        gap: (student.time - bestTime) > 0.001
            ? `+${formatTime(student.time - bestTime)}`
            : '',
    }));

    /**
     * DataGrid column configuration
     */
    const columns = [
        // Pos column
        {
            field: "rank",
            headerName: "Pos",
            width: isMobile ? 40 : 60,
            sortable: false, // Set to false
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <Typography
                    variant="body2"
                    className={`pos-cell pos-${params.value}`}
                    sx={{
                        fontSize: isMobile ? '0.85em' : '1em',
                        fontWeight: 'bold',
                        color: '#000000',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#2b2e3a',
                    }}
                >
                    {params.value}
                </Typography>
            ),
        },
        // Name column
        {
            field: "name",
            headerName: "Driver Name",
            width: isMobile ? 180 : 400,
            flex: isMobile ? null : 1,
            sortable: false, // Set to false
            renderCell: (params) => (
                <Typography
                    variant="body2"
                    sx={{
                        color: '#000000',
                        fontSize: isMobile ? '0.85em' : '1em',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        paddingLeft: '8px'
                    }}
                >
                    {params.value}
                </Typography>
            ),
        },
        // Lap Time column
        {
            field: "lapTime",
            headerName: "Time",
            width: isMobile ? 75 : 120,
            sortable: false, // Set to false
            headerAlign: 'right',
            align: 'right',
            renderCell: (params) => (
                <Typography
                    variant="body2"
                    className={params.value === formattedBestTime ? "best-lap" : ""}
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingRight: '8px',
                        fontSize: isMobile ? '0.85em' : '1em',
                        fontWeight: 'bold',
                        color: '#000000'
                    }}
                >
                    {params.value}
                </Typography>
            ),
        },
        // Gap column
        {
            field: "gap",
            headerName: "Gap",
            width: isMobile ? 65 : 120,
            sortable: false, // Set to false
            headerAlign: 'right',
            align: 'right',
            renderCell: (params) => (
                <Typography
                    variant="body2"
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingRight: '8px',
                        fontSize: isMobile ? '0.8em' : '0.9em',
                        color: params.value === '' ? '#6c757d' : '#000000',
                    }}
                >
                    {params.value === '' ? '--' : params.value}
                </Typography>
            ),
        },
    ];

    // Main component render
    return (
        <Box sx={{ p: isMobile ? 0 : 3 }}>
            {/* Tab navigation */}
            <Box sx={{ borderBottom: 1, borderColor: "divider" }} className="f1-tabs-container">
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant={isMobile ? "scrollable" : "fullWidth"}
                    scrollButtons="auto"
                    TabIndicatorProps={{ className: 'f1-indicator' }}
                >
                    <Tab label="OVERALL" className="f1-tab" />
                    <Tab label="SEMESTER 1" className="f1-tab" />
                    <Tab label="SEMESTER 2" className="f1-tab" />
                </Tabs>
            </Box>

            {/* Main leaderboard data grid */}
            <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                // Initial sort ensures the ranking is correct on load
                initialState={{
                    sorting: {
                        sortModel: [{ field: 'lapTime', sort: 'asc' }],
                    },
                }}
                rowHeight={isMobile ? 35 : 50}
                className="f1-datagrid-minimal"
                checkboxSelection={showGroups}
                onRowSelectionModelChange={(newSelection) =>
                    handleSelection(newSelection)
                }
                disableColumnMenu
                disableColumnSelector
                disableDensitySelector
            />

            {/* Racing groups section (conditional) */}
            {renderGroups()}
        </Box>
    );
};

export default Leaderboard;