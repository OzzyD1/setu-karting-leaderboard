import { useMemo, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Tabs, Tab, Box } from "@mui/material";
import Podium from "./Podium";
import Highlights from "./Highlights";
import DriverDialog from "./DriverDialog";
import { currentBoard, allTimeBoard, champions, movement, formatTime } from "../data/stats";

const ALL_TIME = 3; // tabs: 0 = Overall, 1 = Semester 1, 2 = Semester 2, 3 = All-time

// Places gained or lost since the latest session
const Mover = ({ move }) => {
    if (!move) return null;
    if (move.kind === "new") return <span className="mover mover-new">NEW</span>;
    if (move.change > 0) return <span className="mover mover-up">▲{move.change}</span>;
    if (move.change < 0) return <span className="mover mover-down">▼{-move.change}</span>;
    return null;
};

const Leaderboard = ({ selectedYear }) => {
    const isMobile = useMediaQuery("(max-width:600px)");
    const [tab, setTab] = useState(0);
    const [query, setQuery] = useState("");
    const [openDriver, setOpenDriver] = useState(null);
    const allTime = tab === ALL_TIME;

    const drivers = useMemo(
        () => (allTime ? allTimeBoard() : currentBoard(selectedYear, tab)),
        [allTime, selectedYear, tab]
    );
    const moves = useMemo(
        () => (allTime ? {} : movement(selectedYear, tab)),
        [allTime, selectedYear, tab]
    );
    const bestTime = drivers.length > 0 ? drivers[0].time : 0;

    // Rows are already sorted, so rank is just the position in the list
    const rows = drivers.map((driver, index) => ({
        id: driver.name,
        rank: index + 1,
        name: driver.name,
        lapTime: formatTime(driver.time),
        gap: driver.time - bestTime > 0.0005 ? `+${formatTime(driver.time - bestTime)}` : "",
        season: driver.season,
    }));

    const search = query.trim().toLowerCase();
    const shown = search ? rows.filter((r) => r.name.toLowerCase().includes(search)) : rows;

    return (
        <Box sx={{ p: isMobile ? 0 : 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }} className="f1-tabs-container">
                <Tabs
                    value={tab}
                    onChange={(event, newValue) => setTab(newValue)}
                    variant="fullWidth"
                    TabIndicatorProps={{ className: "f1-indicator" }}
                >
                    <Tab label="OVERALL" className="f1-tab" />
                    <Tab label={isMobile ? "SEM 1" : "SEMESTER 1"} className="f1-tab" />
                    <Tab label={isMobile ? "SEM 2" : "SEMESTER 2"} className="f1-tab" />
                    <Tab label="ALL-TIME" className="f1-tab" />
                </Tabs>
            </Box>

            {allTime ? (
                <section className="highlights">
                    <h2>Season champions</h2>
                    <div className="highlights-grid">
                        {champions().map((c) => (
                            <button
                                key={c.year}
                                type="button"
                                className="highlight"
                                onClick={() => setOpenDriver(c.name)}
                            >
                                <span className="highlight-label">{c.year}</span>
                                <span className="highlight-value">{c.name}</span>
                                <span className="highlight-detail">{formatTime(c.time)}</span>
                            </button>
                        ))}
                    </div>
                </section>
            ) : (
                <Highlights year={selectedYear} onSelect={setOpenDriver} />
            )}

            {drivers.length === 0 ? (
                <p className="empty">No times yet. Check back after the first session.</p>
            ) : (
                <>
                    <Podium drivers={drivers} onSelect={setOpenDriver} />

                    <div className="search">
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Find a driver"
                            aria-label="Find a driver"
                        />
                        {!allTime && (
                            <span className="legend">
                                <span className="pb-lap">Green</span> = improved at the latest session
                            </span>
                        )}
                    </div>

                    <table className={`board${isMobile ? " board-mobile" : ""}`}>
                        <thead>
                            <tr>
                                <th className="board-pos">Pos</th>
                                <th className="board-name">Driver Name</th>
                                <th className="board-time">Time</th>
                                <th className="board-gap">{allTime ? "Season" : "Gap"}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shown.map((row) => (
                                <tr
                                    key={row.id}
                                    tabIndex={0}
                                    onClick={() => setOpenDriver(row.name)}
                                    onKeyDown={(e) => e.key === "Enter" && setOpenDriver(row.name)}
                                >
                                    <td className="board-pos">{row.rank}</td>
                                    <td className="board-name">
                                        <span className="name-cell">
                                            <span className="name-text">{row.name}</span>
                                            <Mover move={moves[row.name]} />
                                        </span>
                                    </td>
                                    <td
                                        className={
                                            "board-time " +
                                            (row.rank === 1
                                                ? "best-lap"
                                                : moves[row.name]?.kind === "pb"
                                                ? "pb-lap"
                                                : "")
                                        }
                                    >
                                        {row.lapTime}
                                    </td>
                                    <td className={`board-gap${row.gap === "" && !allTime ? " board-muted" : ""}`}>
                                        {allTime ? row.season : row.gap === "" ? "--" : row.gap}
                                    </td>
                                </tr>
                            ))}
                            {shown.length === 0 && (
                                <tr className="board-none">
                                    <td colSpan={4}>No driver matches that name</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            )}

            <DriverDialog name={openDriver} year={selectedYear} onClose={() => setOpenDriver(null)} />
        </Box>
    );
};

export default Leaderboard;
