/**
 * Leaderboard Component
 *
 * Displays karting lap times in a tabbed interface with three views:
 * - Overall: Combined best times from both semesters
 * - Semester 1: Only semester 1 times
 * - Semester 2: Only semester 2 times
 *
 * Features:
 * - Responsive design for mobile and desktop
 * - Color-coded performance tiers (gold, silver, bronze)
 * - Optional group selection for race organization
 * - Automatic ranking based on lap times
 */

import { useState } from "react";
import { Cup } from "../icons/Cup";
import drivers_sem1 from "../data/sem_1";
import drivers_sem2 from "../data/sem_2";
import { DataGrid } from "@mui/x-data-grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Tabs, Tab, Box } from "@mui/material";

const Leaderboard = ({ showGroups, selectedStudents, setSelectedStudents }) => {
    // Detect mobile screen size for responsive layout
    const isMobile = useMediaQuery("(max-width:600px)");

    // Tab state: 0=Overall, 1=Semester 1, 2=Semester 2
    const [tabValue, setTabValue] = useState(0);

    /**
     * Handle row selection for group generation
     * Only active when showGroups prop is true
     */
    const handleSelection = (selection) => {
        if (!showGroups) return;
        const selected = sortedDrivers.filter((student) =>
            selection.includes(student.student_id)
        );
        setSelectedStudents(selected);
    };

    /**
     * Temporary placeholder for groups - will be moved to GroupSelector
     */
    const renderGroups = () => {
        return null; // Groups will be handled by GroupSelector component
    };

    /**
     * Handle tab switching between different time period views
     */
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    /**
     * Get drivers data based on selected tab
     * For Overall tab: combines both semesters and keeps best time per student
     * For individual semesters: returns only that semester's data
     */
    const getCurrentDrivers = () => {
        const driverMap = new Map();
        switch (tabValue) {
            case 0: // Overall - combine both semesters, keep best time per student
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

    // Create rank mapping: student_id -> rank position (1-based)
    const ranks = new Map(
        sortedDrivers.map((driver, index) => [driver.student_id, index + 1])
    );

    /**
     * Determine performance tier based on lap time
     * @param {Object} student - Student with time property
     * @returns {string} - Color class: 'gold', 'silver', or 'peru' (bronze)
     */
    const getStudentClass = (student) => {
        if (student.time < 22) {
            return "gold"; // Fastest tier: under 22 seconds
        } else if (student.time < 23) {
            return "silver"; // Middle tier: 22-23 seconds
        } else {
            return "peru"; // Slower tier: 23+ seconds
        }
    };

    /**
     * Transform driver data into DataGrid row format
     * Each row contains: id, cup color, rank, name, and lap time
     */
    const rows = currentDrivers.map((student) => ({
        id: student.student_id,
        cup: getStudentClass(student),
        rank: ranks.get(student.student_id),
        name: student.name,
        lapTime: student.time,
    }));

    /**
     * DataGrid column configuration
     * Responsive widths based on screen size
     */
    const columns = [
        {
            field: "cup",
            headerName: "Cup",
            width: isMobile ? 30 : 60,
            renderCell: (params) => <Cup fill={params.row.cup} />, // Custom cup icon
        },
        { field: "rank", headerName: "Rank", width: isMobile ? 20 : 80 },
        { field: "name", headerName: "Name", width: isMobile ? 120 : 300 },
        {
            field: "lapTime",
            headerName: "Lap Time",
            width: isMobile ? 70 : 120,
        },
    ];

    // Main component render
    return (
        <Box sx={{ p: 3 }}>
            {/* Tab navigation for different time periods */}
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

            {/* Main leaderboard data grid */}
            <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                sortModel={[{ field: "lapTime", sort: "asc" }]} // Default sort by lap time
                sx={isMobile ? null : { fontSize: "1.2em" }} // Larger font on desktop
                checkboxSelection={showGroups} // Enable selection only for group mode
                onRowSelectionModelChange={(newSelection) =>
                    handleSelection(newSelection)
                }
            />

            {/* Racing groups section (conditional) */}
            {renderGroups()}
        </Box>
    );
};

export default Leaderboard;
