import { formatTime } from "../data/stats";

// Top three, shown 2nd - 1st - 3rd like a real podium
const Podium = ({ drivers, onSelect }) => {
    if (drivers.length < 3) return null;
    const order = [1, 0, 2];

    return (
        <div className="podium">
            {order.map((i) => (
                <button
                    key={drivers[i].name}
                    type="button"
                    className={`podium-step podium-${i + 1}`}
                    onClick={() => onSelect(drivers[i].name)}
                >
                    <span className="podium-name">{drivers[i].name}</span>
                    <span className="podium-time">{formatTime(drivers[i].time)}</span>
                    <span className="podium-block">{i + 1}</span>
                </button>
            ))}
        </div>
    );
};

export default Podium;
