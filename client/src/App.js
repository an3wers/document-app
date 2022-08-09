import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Document from "./pages/Document";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":id" element={<Document />} />
      </Routes>
    </div>
  );
}

export default App;
