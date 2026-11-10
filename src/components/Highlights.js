import { latestSession, formatTime, formatDate } from "../data/stats";

// A short summary of the most recent session of the chosen year
const Highlights = ({ year, onSelect }) => {
    const session = latestSession(year);
    if (!session) return null;

    const { entries } = session;
    const pbs = entries.filter((e) => e.kind === "pb");
    const newcomers = entries.filter((e) => e.kind === "new");
    const improver = [...pbs].sort((a, b) => b.gain - a.gain)[0];
    const fastest = [...entries].sort((a, b) => a.time - b.time)[0];

    const stats = [
        { label: "Personal bests", value: pbs.length },
        { label: "New drivers", value: newcomers.length },
        improver && {
            label: "Most improved",
            value: improver.name,
            detail: `-${formatTime(improver.gain)}s`,
            name: improver.name,
        },
        fastest && {
            label: "Fastest of the session",
            value: fastest.name,
            detail: formatTime(fastest.time),
            name: fastest.name,
        },
    ].filter(Boolean);

    return (
        <section className="highlights">
            <h2>Latest session · {formatDate(session.date)}</h2>
            <div className="highlights-grid">
                {stats.map((s) =>
                    s.name ? (
                        <button
                            key={s.label}
                            type="button"
                            className="highlight"
                            onClick={() => onSelect(s.name)}
                        >
                            <span className="highlight-label">{s.label}</span>
                            <span className="highlight-value">{s.value}</span>
                            <span className="highlight-detail">{s.detail}</span>
                        </button>
                    ) : (
                        <div key={s.label} className="highlight">
                            <span className="highlight-label">{s.label}</span>
                            <span className="highlight-value highlight-number">{s.value}</span>
                        </div>
                    )
                )}
            </div>
        </section>
    );
};

export default Highlights;
