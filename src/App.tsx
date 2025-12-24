import { Routes, Route } from "react-router-dom";
import StartingCard from "./components/StartingCard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartingCard />} />
    </Routes>
  );
}

export default App;
