import { Box, Typography, Paper, Grid } from "@mui/material";

const GroupGenerator = ({ showGroups, selectedStudents }) => {
    /**
     * Generate racing groups from selected students
     * Groups are created with up to 7 students each
     * Students are sorted slowest to fastest for balanced competition
     */
    const generateGroups = () => {
        if (!selectedStudents || selectedStudents.length === 0) return [];
        // Sort selected students by time (slowest first for group balancing)
        const sortedDrivers = [...selectedStudents].sort(
            (a, b) => b.time - a.time
        );

        const groups = [];

        // Create groups of 7 students each
        for (let i = 0; i < sortedDrivers.length; i += 7) {
            groups.push(sortedDrivers.slice(i, i + 7));
        }
        return groups;
    };

    if (!showGroups || !selectedStudents || selectedStudents.length === 0) {
        return null;
    }

    const groups = generateGroups();

    return (
        <Box sx={{ mt: 4, margin: "20px" }}>
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
                            {/* Render each driver in the group */}
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
                                </Box>
                            ))}
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default GroupGenerator;
