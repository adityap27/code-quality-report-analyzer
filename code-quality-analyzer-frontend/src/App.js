import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from './components/Homepage/Homepage';
import DashboardHome from './components/DashboardHome/DashboardHome'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path="/Dashboard" element={<DashboardHome />} />
          <Route path="/Dashboard/:chartType" element={<DashboardHome />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;