import { Routes, Route } from "react-router-dom";
import StartingCard from "./components/StartingCard";
import How from "./components/How";

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartingCard />} />
      <Route path="/how" element={<How />} />
      {/* <Route path="/game" element={<Game />} /> */}
    </Routes>
  );
}

export default App;
