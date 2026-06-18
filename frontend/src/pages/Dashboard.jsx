import { useState } from 'react'
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts'
import { getCognitiveProfile } from '../utils/profile'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-recharts-tooltip">
        <div className="tooltip-title">{label}</div>
        {payload.map((entry, index) => (
          <div key={index} className="tooltip-row" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: entry.color || entry.stroke, display: 'inline-block' }}></span>
            <span>{entry.name}: {entry.value}{entry.name.includes('Acc') || entry.name.includes('Avg') ? '%' : ''}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

function Dashboard() {
  const [activeTab, setActiveTab] = useState('alerts')

  const userName = localStorage.getItem('userName') || 'Sagar Sharma'
  const userClass = localStorage.getItem('userClass') || 'Class 11B'

  const getInitials = (name) => {
    const parts = name.trim().split(/\s+/)
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  }

  const profile = getCognitiveProfile()
  const cleanClass = userClass.replace('Class ', '')

  // Modulate KPI metrics
  let atRiskCount = 7
  let atRiskTrendText = '+2 new warnings'
  let atRiskTrendClass = 'pill-danger'
  
  let predictionAccuracy = '91%'
  let accuracyTrendText = '+1.2% model gain'
  let accuracyTrendClass = 'pill-success'
  
  let topicsFlagged = 12
  let topicsTrendText = '-3 decay resolved'
  let topicsTrendClass = 'pill-warning'
  
  let welcomeSubtitle = `Your AI digital twin cohort analytics are updated. ${atRiskCount} students are flagged with high risk.`
  
  // Modulate Line Chart
  let lineData = []
  
  // Modulate Pie Chart
  let pieData = []
  
  // Modulate Student risk list
  let students = []
  
  // Modulate Alerts
  let alerts = []
  
  // Modulate Forgetting curves
  let forgettingCurves = []

  if (profile === 'weak') {
    atRiskCount = 11
    atRiskTrendText = '+4 new warnings'
    atRiskTrendClass = 'pill-danger'
    
    predictionAccuracy = '87%'
    accuracyTrendText = '-0.5% model drift'
    accuracyTrendClass = 'pill-warning'
    
    topicsFlagged = 18
    topicsTrendText = '+5 decay warnings'
    topicsTrendClass = 'pill-danger'
    
    welcomeSubtitle = `Your AI digital twin cohort analytics are updated. ${topicsFlagged} topics require immediate revision.`
    
    lineData = [
      { name: 'Wk 1', Class: 62, Twin: 64 },
      { name: 'Wk 2', Class: 63, Twin: 64 },
      { name: 'Wk 3', Class: 60, Twin: 62 },
      { name: 'Wk 4', Class: 61, Twin: 63 },
      { name: 'Wk 5', Class: 65, Twin: 64 },
      { name: 'Wk 6', Class: 64, Twin: 62 },
      { name: 'Wk 7', Class: 66, Twin: 65 },
      { name: 'Wk 8', Class: 68, Twin: 67 },
    ]
    
    pieData = [
      { name: 'Low Risk', value: 8, color: 'var(--success)' },
      { name: 'Medium Risk', value: 10, color: 'var(--warning)' },
      { name: 'High Risk', value: 10, color: 'var(--danger)' },
    ]
    
    students = [
      { name: userName, class: cleanClass, risk: 88, badge: 'High', color: 'var(--danger)', initials: getInitials(userName) },
      { name: 'Priya Patel', class: '11B', risk: 82, badge: 'High', color: 'var(--danger)', initials: 'PP' },
      { name: 'Aarav Mehta', class: '11B', risk: 55, badge: 'Medium', color: 'var(--warning)', initials: 'AM' },
      { name: 'Diya Sharma', class: '11B', risk: 18, badge: 'Low', color: 'var(--success)', initials: 'DS' },
    ]
    
    alerts = [
      { text: `High academic drop risk predicted for ${userName} in Chemistry.`, type: 'danger', time: 'Just now' },
      { text: `${userName}'s active study hours dropped below twin baseline threshold.`, type: 'warning', time: '10m ago' },
      { text: 'Aarav\'s active study hours dropped below twin baseline threshold.', type: 'warning', time: '1h ago' },
    ]
    
    forgettingCurves = [
      { topic: 'Electrostatics', retention: 62, daysLeft: 1, status: 'Review Soon', color: 'var(--warning)' },
      { topic: 'Chemical Kinetics', retention: 41, daysLeft: 0, status: 'Decayed', color: 'var(--danger)' },
      { topic: 'Calculus Limits', retention: 18, daysLeft: 0, status: 'Decayed', color: 'var(--danger)' },
    ]
  } else if (profile === 'strong') {
    atRiskCount = 2
    atRiskTrendText = '0 new warnings'
    atRiskTrendClass = 'pill-success'
    
    predictionAccuracy = '95%'
    accuracyTrendText = '+2.8% model gain'
    accuracyTrendClass = 'pill-success'
    
    topicsFlagged = 5
    topicsTrendText = 'All stable'
    topicsTrendClass = 'pill-success'
    
    welcomeSubtitle = `Your AI digital twin cohort analytics are updated. Retention is high across all subjects.`
    
    lineData = [
      { name: 'Wk 1', Class: 82, Twin: 80 },
      { name: 'Wk 2', Class: 84, Twin: 83 },
      { name: 'Wk 3', Class: 86, Twin: 85 },
      { name: 'Wk 4', Class: 85, Twin: 86 },
      { name: 'Wk 5', Class: 89, Twin: 88 },
      { name: 'Wk 6', Class: 91, Twin: 90 },
      { name: 'Wk 7', Class: 92, Twin: 93 },
      { name: 'Wk 8', Class: 94, Twin: 93 },
    ]
    
    pieData = [
      { name: 'Low Risk', value: 22, color: 'var(--success)' },
      { name: 'Medium Risk', value: 4, color: 'var(--warning)' },
      { name: 'High Risk', value: 2, color: 'var(--danger)' },
    ]
    
    students = [
      { name: 'Priya Patel', class: '11B', risk: 82, badge: 'High', color: 'var(--danger)', initials: 'PP' },
      { name: 'Aarav Mehta', class: '11B', risk: 55, badge: 'Medium', color: 'var(--warning)', initials: 'AM' },
      { name: 'Diya Sharma', class: '11B', risk: 18, badge: 'Low', color: 'var(--success)', initials: 'DS' },
      { name: userName, class: cleanClass, risk: 8, badge: 'Low', color: 'var(--success)', initials: getInitials(userName) },
    ]
    
    alerts = [
      { text: `Twin prediction match for ${userName} increased to 95% successfully.`, type: 'success', time: '5m ago' },
      { text: `${userName}'s retention profile calibrated at 96% optimal efficiency.`, type: 'success', time: '1h ago' },
      { text: 'Calculus Limits decay warning cleared.', type: 'success', time: '3h ago' },
    ]
    
    forgettingCurves = [
      { topic: 'Electrostatics', retention: 95, daysLeft: 8, status: 'Stable', color: 'var(--success)' },
      { topic: 'Chemical Kinetics', retention: 84, daysLeft: 5, status: 'Stable', color: 'var(--success)' },
      { topic: 'Calculus Limits', retention: 72, daysLeft: 3, status: 'Stable', color: 'var(--success)' },
    ]
  } else {
    // average / standard
    atRiskCount = 7
    atRiskTrendText = '+2 new warnings'
    atRiskTrendClass = 'pill-danger'
    
    predictionAccuracy = '91%'
    accuracyTrendText = '+1.2% model gain'
    accuracyTrendClass = 'pill-success'
    
    topicsFlagged = 12
    topicsTrendText = '-3 decay resolved'
    topicsTrendClass = 'pill-warning'
    
    welcomeSubtitle = `Your AI digital twin cohort analytics are updated. ${atRiskCount} students are flagged with high risk.`
    
    lineData = [
      { name: 'Wk 1', Class: 72, Twin: 74 },
      { name: 'Wk 2', Class: 75, Twin: 74 },
      { name: 'Wk 3', Class: 78, Twin: 77 },
      { name: 'Wk 4', Class: 74, Twin: 75 },
      { name: 'Wk 5', Class: 81, Twin: 80 },
      { name: 'Wk 6', Class: 83, Twin: 84 },
      { name: 'Wk 7', Class: 85, Twin: 86 },
      { name: 'Wk 8', Class: 88, Twin: 87 },
    ]
    
    pieData = [
      { name: 'Low Risk', value: 15, color: 'var(--success)' },
      { name: 'Medium Risk', value: 6, color: 'var(--warning)' },
      { name: 'High Risk', value: 7, color: 'var(--danger)' },
    ]
    
    students = [
      { name: 'Priya Patel', class: '11B', risk: 82, badge: 'High', color: 'var(--danger)', initials: 'PP' },
      { name: userName, class: cleanClass, risk: 45, badge: 'Medium', color: 'var(--warning)', initials: getInitials(userName) },
      { name: 'Aarav Mehta', class: '11B', risk: 55, badge: 'Medium', color: 'var(--warning)', initials: 'AM' },
      { name: 'Diya Sharma', class: '11B', risk: 18, badge: 'Low', color: 'var(--success)', initials: 'DS' },
    ]
    
    alerts = [
      { text: 'High academic drop risk predicted for Priya Patel in Chemistry.', type: 'danger', time: '12m ago' },
      { text: `${userName}'s active study hours are pacing at baseline threshold.`, type: 'warning', time: '45m ago' },
      { text: 'Twin simulation prediction accuracy increased to 91% successfully.', type: 'success', time: '3h ago' },
    ]
    
    forgettingCurves = [
      { topic: 'Electrostatics', retention: 85, daysLeft: 6, status: 'Stable', color: 'var(--success)' },
      { topic: 'Chemical Kinetics', retention: 58, daysLeft: 2, status: 'Review Soon', color: 'var(--warning)' },
      { topic: 'Calculus Limits', retention: 32, daysLeft: 0, status: 'Decayed', color: 'var(--danger)' },
    ]
  }

  // Models accuracy list
  const modelAccuracies = [
    { name: 'Random Forest', accuracy: 93, highlight: true },
    { name: 'Support Vector Machine', accuracy: 89, highlight: false },
    { name: 'Naive Bayes', accuracy: 85, highlight: false },
    { name: 'Decision Tree', accuracy: 84, highlight: false },
    { name: 'Logistic Regression', accuracy: 82, highlight: false },
  ]

  return (
    <div className="dashboard-page fadeUp" id="dashboard-page">
      {/* Section 1: Welcome Banner */}
      <div className="card welcome-banner">
        <div className="welcome-content-left">
          <h2 className="welcome-title">Hello, {userName}! 👋</h2>
          <p className="welcome-subtitle">
            {welcomeSubtitle}
          </p>
          <div className="welcome-chips-row">
            <span className="welcome-chip-item">Cohort: {userClass}</span>
            <span className="welcome-chip-item">Active Twins: 28</span>
            <span className="welcome-chip-item">API Status: Connected</span>
          </div>
        </div>
        <div className="welcome-graphic-right">🎓</div>
      </div>

      {/* Section 2: 4 Metric Cards */}
      <div className="metrics-grid-4">
        <div className="card metric-card-styled">
          <div className="metric-details">
            <span className="metric-title-muted">Total Students</span>
            <span className="metric-number">28</span>
            <div className="metric-trend-row">
              <span className="pill pill-primary">+4 this semester</span>
            </div>
          </div>
          <div className="metric-icon-circle" style={{ backgroundColor: 'rgba(177, 178, 255, 0.12)', color: 'var(--accent-primary)' }}>
            👥
          </div>
        </div>

        <div className="card metric-card-styled risk-card">
          <div className="metric-details">
            <span className="metric-title-muted">At-Risk Students</span>
            <span className="metric-number" style={{ color: 'var(--danger)' }}>{atRiskCount}</span>
            <div className="metric-trend-row">
              <span className={`pill ${atRiskTrendClass}`}>{atRiskTrendText}</span>
            </div>
          </div>
          <div className="metric-icon-circle" style={{ backgroundColor: 'rgba(239, 68, 68, 0.12)', color: 'var(--danger)' }}>
            ⚠️
          </div>
        </div>

        <div className="card metric-card-styled accuracy-card">
          <div className="metric-details">
            <span className="metric-title-muted">Prediction Accuracy</span>
            <span className="metric-number" style={{ color: 'var(--success)' }}>{predictionAccuracy}</span>
            <div className="metric-trend-row">
              <span className={`pill ${accuracyTrendClass}`}>{accuracyTrendText}</span>
            </div>
          </div>
          <div className="metric-icon-circle" style={{ backgroundColor: 'rgba(34, 197, 94, 0.12)', color: 'var(--success)' }}>
            🎯
          </div>
        </div>

        <div className="card metric-card-styled topic-card">
          <div className="metric-details">
            <span className="metric-title-muted">Topics Flagged</span>
            <span className="metric-number" style={{ color: 'var(--warning)' }}>{topicsFlagged}</span>
            <div className="metric-trend-row">
              <span className={`pill ${topicsTrendClass}`}>{topicsTrendText}</span>
            </div>
          </div>
          <div className="metric-icon-circle" style={{ backgroundColor: 'rgba(245, 158, 11, 0.12)', color: 'var(--warning)' }}>
            🚩
          </div>
        </div>
      </div>


      {/* Section 3: Charts Row */}
      <div className="dashboard-charts-row">
        <div className="card">
          <h3 className="card-title">Class Performance vs Twin Prediction</h3>
          <div style={{ width: '100%', height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF1FF" />
                <XAxis dataKey="name" stroke="#8888AA" style={{ fontSize: 11, fontFamily: 'var(--font-body)' }} />
                <YAxis stroke="#8888AA" style={{ fontSize: 11, fontFamily: 'var(--font-body)' }} domain={[60, 95]} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11, fontFamily: 'var(--font-body)', paddingTop: 10 }} />
                <Line 
                  type="monotone" 
                  dataKey="Class" 
                  name="Actual Class Avg" 
                  stroke="var(--accent-primary)" 
                  strokeWidth={3} 
                  activeDot={{ r: 6 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="Twin" 
                  name="Twin Predicted Avg" 
                  stroke="var(--accent-secondary)" 
                  strokeWidth={3} 
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card" style={{ position: 'relative' }}>
          <h3 className="card-title">Risk Distribution</h3>
          <div style={{ width: '100%', height: 220, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ width: '100%', height: 160, position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={66}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="chart-doughnut-inner-label">
                <span className="doughnut-number">28</span>
                <span className="doughnut-label">Total</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '4px' }}>
              {pieData.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10.5px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color }}></span>
                  <span>{item.name} ({item.value})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Monitors & Feeds */}
      <div className="dashboard-bottom-grid">
        {/* Student Risk Monitor */}
        <div className="card">
          <h3 className="card-title">Student Risk Monitor</h3>
          <div className="risk-monitor-list">
            {students.map((student, idx) => (
              <div key={idx} className="risk-monitor-item">
                <div 
                  className="avatar-circle" 
                  style={{ backgroundColor: student.color }}
                >
                  {student.initials}
                </div>
                <div className="student-info-meta">
                  <span className="student-name">{student.name}</span>
                  <span className="student-class">Class {student.class}</span>
                </div>
                <div className="risk-progress-section">
                  <div className="progress-bar-container">
                    <div 
                      className="progress-bar-fill" 
                      style={{ width: `${student.risk}%`, backgroundColor: student.color }}
                    ></div>
                  </div>
                  <span className="risk-progress-text">{student.risk}% Risk</span>
                </div>
                <span className={`pill ${
                  student.badge === 'High' ? 'pill-danger' : 
                  student.badge === 'Medium' ? 'pill-warning' : 'pill-success'
                }`}>
                  {student.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Switchable Alerts / Memory Tabs */}
        <div className="card">
          <div className="tab-switcher">
            <button 
              className={`tab-btn ${activeTab === 'alerts' ? 'active' : ''}`} 
              onClick={() => setActiveTab('alerts')}
            >
              Alerts Feed
            </button>
            <button 
              className={`tab-btn ${activeTab === 'memory' ? 'active' : ''}`} 
              onClick={() => setActiveTab('memory')}
            >
              Forgetting Curves
            </button>
          </div>

          {activeTab === 'alerts' ? (
            <div className="alerts-feed">
              {alerts.map((alert, idx) => (
                <div key={idx} className={`alert-item alert-${alert.type}`}>
                  <div className={`alert-dot dot-${alert.type}`}></div>
                  <div className="alert-content">
                    <span className="alert-text">{alert.text}</span>
                    <span className="alert-time">{alert.time}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="memory-list">
              {forgettingCurves.map((curve, idx) => (
                <div key={idx} className="memory-row-item">
                  <div className="memory-topic-col">{curve.topic}</div>
                  <div className="memory-bar-wrapper">
                    <div className="progress-bar-container" style={{ flex: 1, margin: 0 }}>
                      <div 
                        className="progress-bar-fill" 
                        style={{ width: `${curve.retention}%`, backgroundColor: curve.color }}
                      ></div>
                    </div>
                    <span className="memory-percent-text" style={{ color: curve.color }}>{curve.retention}%</span>
                  </div>
                  <span className="memory-status-badge" style={{ color: curve.color }}>
                    {curve.daysLeft === 0 ? '⚠️ Decayed' : `${curve.daysLeft}d left`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Section 5: Model Performance Accuracies */}
      <div className="card model-performance-horizontal">
        <h3 className="card-title">Ensemble Model Accuracies</h3>
        <div className="model-perf-list">
          {modelAccuracies.map((model, idx) => (
            <div className={`model-perf-bar-card ${model.highlight ? 'highlighted' : ''}`} key={idx}>
              {model.highlight && <span className="highlight-star">⭐</span>}
              <div className="model-perf-header">
                <span className="model-perf-name">{model.name}</span>
                <span className="model-perf-val">{model.accuracy}%</span>
              </div>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${model.accuracy}%`, backgroundColor: model.highlight ? 'var(--accent-primary)' : 'var(--accent-secondary)' }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

