import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { academicYears } from "../data/getCurrentYear";

const formatTime = (time) => time.toFixed(3);

const byTime = (list) => [...list].sort((a, b) => a.time - b.time);

// Drivers for the chosen tab (0 = Overall, 1 = Semester 1, 2 = Semester 2), fastest first
const getDrivers = (yearData, tab) => {
    const sem1 = yearData?.sem1 ?? [];
    const sem2 = yearData?.sem2 ?? [];

    if (tab === 1) return byTime(sem1);
    if (tab === 2) return byTime(sem2);

    // Overall: keep each person's best time across both semesters
    const best = new Map();
    [...sem1, ...sem2].forEach((d) => {
        if (!best.has(d.name) || best.get(d.name).time > d.time) {
            best.set(d.name, d);
        }
    });
    return byTime([...best.values()]);
};

// Shared look for a centred cell
const cellSx = (isMobile, extra = {}) => ({
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: isMobile ? "0.85em" : "1em",
    color: "#000000",
    ...extra,
});

const Leaderboard = ({ showGroups, setSelectedStudents, selectedYear }) => {
    const isMobile = useMediaQuery("(max-width:600px)");
    const [tab, setTab] = useState(0);

    const drivers = getDrivers(academicYears[selectedYear], tab);
    const bestTime = drivers.length > 0 ? drivers[0].time : 0;

    // Rows are already sorted, so rank is just the position in the list
    const rows = drivers.map((driver, index) => ({
        id: driver.name,
        rank: index + 1,
        name: driver.name,
        lapTime: formatTime(driver.time),
        gap:
            driver.time - bestTime > 0.001
                ? `+${formatTime(driver.time - bestTime)}`
                : "",
    }));
    const formattedBestTime = rows.length > 0 ? rows[0].lapTime : "";

    const handleSelection = (selection) => {
        if (!showGroups) return;
        setSelectedStudents(drivers.filter((d) => selection.includes(d.name)));
    };

    const columns = [
        {
            field: "rank",
            headerName: "Pos",
            width: isMobile ? 40 : 60,
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <Typography
                    variant="body2"
                    className={`pos-cell pos-${params.value}`}
                    sx={cellSx(isMobile, {
                        fontWeight: "bold",
                        backgroundColor: "#2b2e3a",
                    })}
                >
                    {params.value}
                </Typography>
            ),
        },
        {
            field: "name",
            headerName: "Driver Name",
            width: isMobile ? 170 : 400,
            flex: isMobile ? null : 1,
            sortable: false,
            renderCell: (params) => (
                <Typography
                    variant="body2"
                    sx={{
                        color: "#000000",
                        fontSize: isMobile ? "0.85em" : "1em",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        paddingLeft: "8px",
                    }}
                >
                    {params.value}
                </Typography>
            ),
        },
        {
            field: "lapTime",
            headerName: "Time",
            width: isMobile ? 75 : 120,
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <Typography
                    variant="body2"
                    className={params.value === formattedBestTime ? "best-lap" : ""}
                    sx={cellSx(isMobile, { fontWeight: "bold" })}
                >
                    {params.value}
                </Typography>
            ),
        },
        {
            field: "gap",
            headerName: "Gap",
            width: isMobile ? 65 : 120,
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <Typography
                    variant="body2"
                    sx={cellSx(isMobile, {
                        fontSize: isMobile ? "0.8em" : "0.9em",
                        color: params.value === "" ? "#6c757d" : "#000000",
                    })}
                >
                    {params.value === "" ? "--" : params.value}
                </Typography>
            ),
        },
    ];

    return (
        <Box sx={{ p: isMobile ? 0 : 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }} className="f1-tabs-container">
                <Tabs
                    value={tab}
                    onChange={(event, newValue) => setTab(newValue)}
                    variant={isMobile ? "scrollable" : "fullWidth"}
                    scrollButtons="auto"
                    TabIndicatorProps={{ className: "f1-indicator" }}
                >
                    <Tab label="OVERALL" className="f1-tab" />
                    <Tab label="SEMESTER 1" className="f1-tab" />
                    <Tab label="SEMESTER 2" className="f1-tab" />
                </Tabs>
            </Box>

            <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                rowHeight={isMobile ? 35 : 50}
                className="f1-datagrid-minimal"
                checkboxSelection={showGroups}
                onRowSelectionModelChange={handleSelection}
                disableColumnMenu
                disableColumnSelector
                disableDensitySelector
            />
        </Box>
    );
};

export default Leaderboard;
