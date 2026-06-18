import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Dashboard from './pages/Dashboard'
import MyTwin from './pages/MyTwin'
import Forecast from './pages/Forecast'
import Predictor from './pages/Predictor'
import Models from './pages/Models'
import Login from './pages/Login'
import Onboarding from './pages/Onboarding'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true'
  })
  
  const [isOnboarded, setIsOnboarded] = useState(() => {
    return localStorage.getItem('isOnboarded') === 'true'
  })

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true')
    setIsLoggedIn(true)
  }

  const handleOnboardingComplete = () => {
    localStorage.setItem('isOnboarded', 'true')
    setIsOnboarded(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('isOnboarded')
    setIsLoggedIn(false)
    setIsOnboarded(false)
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />
  }

  if (!isOnboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />
  }

  return (
    <Router>
      <div className="app-layout">
        <Sidebar onLogout={handleLogout} />
        <div className="main-wrapper">
          <Topbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/mytwin" element={<MyTwin />} />
              <Route path="/forecast" element={<Forecast />} />
              <Route path="/predictor" element={<Predictor />} />
              <Route path="/models" element={<Models />} />
              {/* Fallback route to redirect back home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
