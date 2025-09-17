import drivers_sem1_2024 from "./2024/sem_1";
import drivers_sem2_2024 from "./2024/sem_2";
import drivers_sem1_2025 from "./2025/sem_1";

export const academicYears = {
    "2024-2025": {
        label: "2024-2025",
        sem1: drivers_sem1_2024,
        sem2: drivers_sem2_2024,
    },
    "2025-2026": {
        label: "2025-2026",
        sem1: drivers_sem1_2025,
        // sem2: drivers_sem2_2025
    },
};

export const getCurrentAcademicYear = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    // Academic year starts in September (month 8)
    if (month >= 8) {
        return `${year}-${year + 1}`;
    } else {
        return `${year - 1}-${year}`;
    }
};
