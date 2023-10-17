import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardHome from "./components/DashboardHome/DashboardHome";
import Homepage from './components/Homepage/Homepage';

function App() {
  return (
    <><div className="App">
    </div><Router>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path="dashboard" element={<DashboardHome />} />
          {/* <Route path="/dashboard/:chartType" element={<DashboardHome />} /> */}

        </Routes>
      </Router></>
  );
}

export default App;




