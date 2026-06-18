import { Link, useLocation } from 'react-router-dom'

function Sidebar({ onLogout }) {
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/' || location.pathname === '/dashboard'
    }
    return location.pathname === path
  }

  const userName = localStorage.getItem('userName') || 'Sagar Sharma'
  const userClass = localStorage.getItem('userClass') || 'Class 11B'

  const getInitials = (name) => {
    const parts = name.trim().split(/\s+/)
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  }

  const initials = getInitials(userName)

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-brand-wrapper">
          <div className="sidebar-brand">
            <h1>
              <span className="logo-edu">EDU</span>
              <span className="logo-twin">TWIN</span>
            </h1>
          </div>
          <div className="sidebar-tagline">AI Student Twin Platform</div>
        </div>
        
        <nav className="sidebar-nav">
          <Link 
            to="/dashboard" 
            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
            id="nav-dashboard"
          >
            <span className="nav-icon">📊</span>
            <span className="nav-label">Dashboard</span>
          </Link>
          
          <Link 
            to="/mytwin" 
            className={`nav-link ${isActive('/mytwin') ? 'active' : ''}`}
            id="nav-mytwin"
          >
            <span className="nav-icon">🪞</span>
            <span className="nav-label">My Twin</span>
          </Link>
          
          <Link 
            to="/forecast" 
            className={`nav-link ${isActive('/forecast') ? 'active' : ''}`}
            id="nav-forecast"
          >
            <span className="nav-icon">🔮</span>
            <span className="nav-label">Forecast</span>
          </Link>
          
          <Link 
            to="/predictor" 
            className={`nav-link ${isActive('/predictor') ? 'active' : ''}`}
            id="nav-predictor"
          >
            <span className="nav-icon">🎯</span>
            <span className="nav-label">Predictor</span>
          </Link>

          <Link 
            to="/models" 
            className={`nav-link ${isActive('/models') ? 'active' : ''}`}
            id="nav-models"
          >
            <span className="nav-icon">🤖</span>
            <span className="nav-label">Models</span>
          </Link>
        </nav>
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-user-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
            <div className="user-avatar-gradient">{initials}</div>
            <div className="user-info">
              <span className="user-name">{userName}</span>
              <span className="user-role">Student · {userClass}</span>
            </div>
          </div>
          <button 
            className="logout-btn-trigger" 
            onClick={onLogout} 
            title="Sign Out"
            type="button"
          >
            🚪
          </button>
        </div>
        
        <div className="sdg-badges-row">
          <span className="sdg-pill" style={{ borderLeft: '3px solid #4CAF50' }}>SDG 4</span>
          <span className="sdg-pill" style={{ borderLeft: '3px solid #2196F3' }}>SDG 10</span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

