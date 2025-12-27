import { Routes, Route } from "react-router-dom";
import StartingCard from "./components/StartingCard";
import How from "./components/How";
import Play from "./components/Play";
import IndividualPlayer from "./components/parts/IndividualPlayer";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Routes>
        <Route path="/" element={<StartingCard />} />
        <Route path="/how" element={<How />} />
        <Route path="/play" element={<Play />} />
        <Route
          path="/player"
          element={
            <IndividualPlayer
              player={{
                id: 1,
                name: "John Doe",
                isImposter: false,
                category: "Animals",
                word: "Elephant",
              }}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
