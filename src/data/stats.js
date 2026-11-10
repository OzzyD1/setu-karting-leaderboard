import times from "./times.json";

// Everything here is worked out from times.json:
//   times[year].sem1 / sem2  -> { name: best time }
//   times[year].sessions     -> [{ date, sem, laps: { name: time } }], one per session

const SEMS = ["sem1", "sem2"];

// Tabs: 0 = Overall, 1 = Semester 1, 2 = Semester 2
const semsForTab = (tab) => (tab === 1 ? ["sem1"] : tab === 2 ? ["sem2"] : SEMS);

// Turn a list of { name: time } maps into a fastest-first list, keeping each person's best
const toBoard = (maps) => {
    const best = new Map();
    maps.forEach((map) =>
        Object.entries(map ?? {}).forEach(([name, time]) => {
            if (!best.has(name) || best.get(name) > time) best.set(name, time);
        })
    );
    return [...best]
        .map(([name, time]) => ({ name, time }))
        .sort((a, b) => a.time - b.time);
};

export const sessionsOf = (year) =>
    [...(times[year]?.sessions ?? [])].sort((a, b) => a.date.localeCompare(b.date));

export const currentBoard = (year, tab) =>
    toBoard(semsForTab(tab).map((sem) => times[year]?.[sem]));

const latestDate = (year) => sessionsOf(year).pop()?.date ?? null;

// The board as it stood before the latest session
const previousBoard = (year, tab) => {
    const last = latestDate(year);
    const sems = semsForTab(tab);
    return toBoard(
        sessionsOf(year)
            .filter((s) => s.date < last && sems.includes(s.sem))
            .map((s) => s.laps)
    );
};

// What happened at the latest session: one entry per driver who set a time
//   kind: "pb" (beat their semester best), "new" (first time this year),
//         "first" (first time this semester) or "same" (did not improve)
export const latestSession = (year) => {
    const date = latestDate(year);
    if (!date) return null;
    const all = sessionsOf(year);
    const entries = [];
    all.filter((s) => s.date === date).forEach((session) => {
        const earlier = all.filter((s) => s.date < date);
        Object.entries(session.laps).forEach(([name, time]) => {
            const sameSem = earlier
                .filter((s) => s.sem === session.sem && s.laps[name] != null)
                .map((s) => s.laps[name]);
            const before = sameSem.length ? Math.min(...sameSem) : null;
            const seenThisYear = earlier.some((s) => s.laps[name] != null);
            const kind =
                before == null ? (seenThisYear ? "first" : "new") : time < before ? "pb" : "same";
            entries.push({ name, time, kind, gain: kind === "pb" ? before - time : 0 });
        });
    });
    return { date, entries };
};

// For each driver on a tab: places gained since the latest session, and what they did in it
export const movement = (year, tab) => {
    const session = latestSession(year);
    if (!session) return {};
    const before = new Map(previousBoard(year, tab).map((d, i) => [d.name, i + 1]));
    const kinds = new Map(session.entries.map((e) => [e.name, e.kind]));
    const out = {};
    currentBoard(year, tab).forEach((d, i) => {
        const was = before.get(d.name);
        out[d.name] = {
            change: was == null ? 0 : was - (i + 1),
            kind: kinds.get(d.name) ?? null,
        };
    });
    return out;
};

const shortYear = (year) => year.replace(/^\d\d(\d\d)-\d\d(\d\d)$/, "$1/$2");

// Each driver's fastest time ever, with the season it was set in
export const allTimeBoard = () => {
    const best = new Map();
    Object.entries(times).forEach(([year, sems]) =>
        SEMS.forEach((sem) =>
            Object.entries(sems[sem] ?? {}).forEach(([name, time]) => {
                if (!best.has(name) || best.get(name).time > time) {
                    best.set(name, { name, time, season: shortYear(year) });
                }
            })
        )
    );
    return [...best.values()].sort((a, b) => a.time - b.time);
};

// The fastest driver of each season, newest first
export const champions = () =>
    Object.keys(times)
        .sort()
        .reverse()
        .map((year) => ({ year, ...currentBoard(year, 0)[0] }))
        .filter((c) => c.name);

// Everything known about one driver
export const driverProfile = (name) => {
    const seasons = Object.keys(times)
        .sort()
        .map((year) => ({
            year,
            sem1: times[year].sem1?.[name] ?? null,
            sem2: times[year].sem2?.[name] ?? null,
            laps: sessionsOf(year)
                .filter((s) => s.laps[name] != null)
                .map((s) => ({ date: s.date, time: s.laps[name] })),
        }))
        .filter((s) => s.sem1 != null || s.sem2 != null);
    const all = seasons.flatMap((s) => [s.sem1, s.sem2]).filter((t) => t != null);
    return {
        name,
        seasons,
        best: all.length ? Math.min(...all) : null,
        sessions: seasons.reduce((n, s) => n + s.laps.length, 0),
    };
};

export const formatTime = (time) => time.toFixed(3);

export const formatDate = (date) =>
    new Date(`${date}T12:00:00`).toLocaleDateString("en-IE", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
