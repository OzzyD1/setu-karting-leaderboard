import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Cup } from "./icons/Cup";
import {
  CardMeta,
  CardHeader,
  CardDescription,
  CardContent,
  Card,
  Image,
} from "semantic-ui-react";

const leaderboard = [
  { student_id: 20068200, name: "Ozzy Domarkas", time: 21.3 },
  { student_id: 20098232, name: "James Burke", time: 26.8 },
  { student_id: 20009832, name: "Lorna O'Dwyer", time: 22.6 },
  { student_id: 20009835, name: "Cezar K", time: 22.1 },
  { student_id: 20009837, name: "Adrian Newey", time: 21.6 },
  { student_id: 20009830, name: "Ian Connors", time: 21.9 },
  { student_id: 20009878, name: "John Smith", time: 22.7 },
];

const sort = (leaderboard) => {
  return leaderboard.sort((a, b) => {
    return a.time - b.time;
  });
};

// Classes:
// Pro: 20%
// Amateur-Pro: 30%
// Amateur: 50%

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
      style={{ alignItems: "center", display: "flex", flexDirection: "column" }}
    >
      <h1>Leaderboard</h1>
      {sortedLeaderboard.map((student, index) => {
        return (
          <div>
            <Card>
              <CardContent>
                <Image floated="right" size="mini">
                  <Cup fill={getStudentClass(student)} />
                </Image>
                <CardHeader>{student.name}</CardHeader>
                <CardMeta>{student.student_id}</CardMeta>
                <CardDescription>Time: {student.time}</CardDescription>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

export default App;
