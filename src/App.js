import { Cup } from "./icons/Cup";
import leaderboard from "./leaderboard.js";

const sort = (leaderboard) => {
    return leaderboard.sort((a, b) => {
        return a.time - b.time;
    });
};

const getStudentClass = (student) => {
    if (student.time < 22) {
        return "gold";
    } else if (student.time < 24) {
        return "silver";
    } else {
        return "peru";
    }
};

function App() {
    const sortedLeaderboard = sort(leaderboard);
    return (
        <div
            className="App"
            style={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <h1>Leaderboard</h1>
            {sortedLeaderboard.map((student, index) => {
                return (
                    <div>
                        {/* <Card>
                            <CardContent>
                                <Image floated="right" size="mini">
                                    <Cup fill={getStudentClass(student)} />
                                </Image>
                                <CardHeader>{student.name}</CardHeader>
                                <CardMeta>{student.student_id}</CardMeta>
                                <CardDescription>
                                    Time: {student.time}
                                </CardDescription>
                            </CardContent>
                        </Card> */}
                    </div>
                );
            })}
        </div>
    );
}

export default App;
