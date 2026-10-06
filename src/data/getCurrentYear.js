import times from "./times.json";

// times.json stores times like { "Jamie Doyle": 22.258 }.
// The app wants a list like [{ name: "Jamie Doyle", time: 22.258 }].
const toList = (semester = {}) =>
    Object.entries(semester).map(([name, time]) => ({ name, time }));

// Same shape as before: { "2026-2027": { label, sem1: [...], sem2: [...] } }
export const academicYears = Object.fromEntries(
    Object.entries(times).map(([year, sems]) => [
        year,
        { label: year, sem1: toList(sems.sem1), sem2: toList(sems.sem2) },
    ])
);

export const getCurrentAcademicYear = () => {
    const now = new Date();
    const year = now.getFullYear();

    // Academic year starts in September (month 8)
    const current =
        now.getMonth() >= 8 ? `${year}-${year + 1}` : `${year - 1}-${year}`;

    // If that year isn't in times.json yet, show the newest year that is
    return academicYears[current] ? current : Object.keys(academicYears).sort().pop();
};
