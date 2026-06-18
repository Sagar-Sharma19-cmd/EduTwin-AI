import { useLocation } from 'react-router-dom'

function Topbar() {
  const location = useLocation()

  const getBreadcrumb = () => {
    switch (location.pathname) {
      case '/':
      case '/dashboard':
        return 'EDUTWIN / DASHBOARD'
      case '/mytwin':
        return 'EDUTWIN / MY TWIN'
      case '/forecast':
        return 'EDUTWIN / FORECAST'
      case '/predictor':
        return 'EDUTWIN / PREDICTOR ENGINE'
      case '/models':
        return 'EDUTWIN / ML MODELS'
      default:
        return 'EDUTWIN / PLATFORM'
    }
  }

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
      case '/dashboard':
        return 'EduTwin Dashboard'
      case '/mytwin':
        return 'My AI Twin'
      case '/forecast':
        return 'Struggle Forecast'
      case '/predictor':
        return 'Twin Predictor Engine'
      case '/models':
        return 'ML Models'
      default:
        return 'EduTwin AI'
    }
  }

  return (
    <header className="topbar">
      <div className="topbar-container">
        <div className="topbar-left-meta">
          <span className="topbar-breadcrumb">{getBreadcrumb()}</span>
          <h2 className="topbar-title">{getPageTitle()}</h2>
        </div>
        <div className="topbar-actions">
          <div className="live-badge" id="live-badge">
            <span className="pulse-dot"></span>
            <span>LIVE</span>
          </div>
          <div className="topbar-notification" title="View alerts">
            🔔
          </div>
          <button 
            className="sync-action-btn" 
            id="sync-button" 
            onClick={() => alert('Twin synchronized successfully with latest metrics!')}
            type="button"
          >
            🔄 Sync Twin
          </button>
        </div>
      </div>
    </header>
  )
}

export default Topbar

