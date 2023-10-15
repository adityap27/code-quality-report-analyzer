import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardHome from "./components/DashboardHome/DashboardHome";
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import Homepage from './components/Homepage/Homepage';

function App() {
  return (
  <><div className="App">
      <Navbar />
      <Main />
      <Homepage />
    </div><Router>
        <Routes>
          <Route path="/dashboard/" element={<DashboardHome />} />
          <Route path="/dashboard/:chartType" element={<DashboardHome />} />
        </Routes>
      </Router></>
  );
}

export default App;




