import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardHome from "./components/DashboardHome/DashboardHome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<DashboardHome/>}/>
        <Route path="/dashboard/:chartType" element={<DashboardHome/>}/>
      </Routes>
    </Router>
  );
}

export default App;
