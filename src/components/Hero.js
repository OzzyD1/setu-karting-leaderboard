import banner from "../icons/track-banner.jpg";
import { currentBoard, sessionsOf, formatTime } from "../data/stats";

// Photo banner across the top, with a few numbers for the chosen year
const Hero = ({ year }) => {
    const board = currentBoard(year, 0);
    const stats = [
        { label: "Drivers", value: board.length },
        { label: "Sessions", value: new Set(sessionsOf(year).map((s) => s.date)).size },
        board[0] && { label: "Lap record", value: formatTime(board[0].time) },
    ].filter(Boolean);

    return (
        <header className="hero" style={{ backgroundImage: `url(${banner})` }}>
            <div className="hero-inner">
                <p className="hero-kicker">{year} season</p>
                <h1>SETU Karting Club</h1>
                <div className="hero-stats">
                    {stats.map((s) => (
                        <div key={s.label}>
                            <span className="hero-value">{s.value}</span>
                            <span className="hero-label">{s.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </header>
    );
};

export default Hero;
