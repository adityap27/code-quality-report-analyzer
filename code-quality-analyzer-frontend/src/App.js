import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Homepage from './components/homepage/Homepage'
import DashboardHome from './components/dashboardHome/DashboardHome'
import { OneCommitAnalysisProvider } from './OneCommitAnalysisContext'
import { HotspotAnalysisProvider } from './HotspotAnalysisContext'

function App() {
  document.title = 'Code Quality Analyzer'
  return (
    <OneCommitAnalysisProvider>
      <HotspotAnalysisProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="/dashboard/:chartType" element={<DashboardHome />} />
          </Routes>
        </Router>
      </div>
      </HotspotAnalysisProvider>
    </OneCommitAnalysisProvider>
  )
}

export default App
