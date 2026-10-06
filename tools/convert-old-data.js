// Run once from the project root:  node tools/convert-old-data.js
// Reads the old src/data/<year>/sem_1.js and sem_2.js files and writes src/data/times.json.
// Commented-out lines (people with no time) are skipped, and student_id is dropped.

const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "..", "src", "data");
const startYears = [2024, 2025, 2026]; // folder names: 2024 -> "2024-2025"
const result = {};

for (const startYear of startYears) {
    const year = `${startYear}-${startYear + 1}`;
    result[year] = { sem1: {}, sem2: {} };

    for (const n of [1, 2]) {
        const file = path.join(dataDir, String(startYear), `sem_${n}.js`);
        if (!fs.existsSync(file)) continue;

        for (const line of fs.readFileSync(file, "utf8").split("\n")) {
            if (line.trim().startsWith("//")) continue; // commented out
            const match = line.match(/name:\s*"([^"]*)"\s*,\s*time:\s*([0-9.]+)/);
            if (match) result[year][`sem${n}`][match[1].trim()] = Number(match[2]);
        }
    }
}

fs.writeFileSync(path.join(dataDir, "times.json"), JSON.stringify(result, null, 2) + "\n");
console.log("Wrote src/data/times.json");
