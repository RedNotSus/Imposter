import { Routes, Route } from "react-router-dom";
import StartingCard from "./components/StartingCard";
import How from "./components/How";
import Play from "./components/Play";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Routes>
        <Route path="/" element={<StartingCard />} />
        <Route path="/how" element={<How />} />
        <Route path="/play" element={<Play />} />
      </Routes>
    </div>
  );
}

export default App;
