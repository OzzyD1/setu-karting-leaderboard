import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { driverProfile, currentBoard, formatTime, formatDate } from "../data/stats";

// Small line chart of lap times, fastest at the top so that improving goes up
const LapChart = ({ laps }) => {
    const W = 320, H = 150, left = 50, right = 12, top = 14, bottom = 26;
    const min = Math.min(...laps.map((l) => l.time));
    const max = Math.max(...laps.map((l) => l.time));
    const x = (i) =>
        laps.length === 1 ? (left + W - right) / 2 : left + (i * (W - left - right)) / (laps.length - 1);
    const y = (t) => (max === min ? (top + H - bottom) / 2 : top + ((t - min) / (max - min)) * (H - top - bottom));

    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="lap-chart" role="img" aria-label="Lap times by session">
            <line x1={left} y1={y(min)} x2={W - right} y2={y(min)} className="lap-chart-grid" />
            <line x1={left} y1={y(max)} x2={W - right} y2={y(max)} className="lap-chart-grid" />
            <text x={left - 6} y={y(min) + 4} textAnchor="end">{formatTime(min)}</text>
            {max !== min && <text x={left - 6} y={y(max) + 4} textAnchor="end">{formatTime(max)}</text>}
            <polyline points={laps.map((l, i) => `${x(i)},${y(l.time)}`).join(" ")} className="lap-chart-line" />
            {laps.map((l, i) => (
                <circle key={l.date} cx={x(i)} cy={y(l.time)} r={l.time === min ? 5 : 3.5}
                        className={l.time === min ? "lap-chart-best" : "lap-chart-dot"}>
                    <title>{`${formatDate(l.date)}: ${formatTime(l.time)}`}</title>
                </circle>
            ))}
            <text x={left} y={H - 6}>{formatDate(laps[0].date)}</text>
            {laps.length > 1 && (
                <text x={W - right} y={H - 6} textAnchor="end">{formatDate(laps[laps.length - 1].date)}</text>
            )}
        </svg>
    );
};

const DriverDialog = ({ name, year, onClose }) => {
    if (!name) return null;

    const profile = driverProfile(name);
    const rank = currentBoard(year, 0).findIndex((d) => d.name === name) + 1;
    // Chart the chosen year, or their most recent season if they did not race in it
    const season =
        profile.seasons.find((s) => s.year === year && s.laps.length) ??
        [...profile.seasons].reverse().find((s) => s.laps.length);

    const facts = [
        rank > 0 && { label: `${year} position`, value: `P${rank}` },
        { label: "Best ever", value: formatTime(profile.best) },
        { label: "Seasons", value: profile.seasons.length },
        { label: "Sessions with a time", value: profile.sessions },
    ].filter(Boolean);

    return (
        <Dialog open onClose={onClose} fullWidth maxWidth="xs" className="driver-dialog">
            <div className="driver">
                <IconButton onClick={onClose} aria-label="Close" className="driver-close">
                    <CloseIcon />
                </IconButton>
                <h2>{name}</h2>

                <div className="driver-facts">
                    {facts.map((f) => (
                        <div key={f.label}>
                            <span className="highlight-label">{f.label}</span>
                            <span className="driver-fact">{f.value}</span>
                        </div>
                    ))}
                </div>

                {season && (
                    <>
                        <h3>Lap times · {season.year}</h3>
                        <LapChart laps={season.laps} />
                    </>
                )}

                <h3>Season bests</h3>
                <table className="driver-table">
                    <thead>
                        <tr><th>Season</th><th>Sem 1</th><th>Sem 2</th></tr>
                    </thead>
                    <tbody>
                        {[...profile.seasons].reverse().map((s) => (
                            <tr key={s.year}>
                                <td>{s.year}</td>
                                {[s.sem1, s.sem2].map((t, i) => (
                                    <td key={i} className={t === profile.best ? "best-lap" : ""}>
                                        {t == null ? "--" : formatTime(t)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Dialog>
    );
};

export default DriverDialog;
