import { useState } from 'react'
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
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
            <span>{entry.name}: {entry.value}% Risk</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

function Forecast() {
  const [doneStates, setDoneStates] = useState([false, false, false])

  const toggleDone = (idx) => {
    setDoneStates(prev => {
      const next = [...prev]
      next[idx] = !next[idx]
      return next
    })
  }

  const profile = getCognitiveProfile()

  let forecastData = []
  let summaryStats = []
  let recommendations = []
  let heatmapData = []
  let headerAvgRisk = '38.3%'
  let headerDecayWarns = '4 Topics'

  if (profile === 'weak') {
    headerAvgRisk = '59.4%'
    headerDecayWarns = '6 Topics'

    forecastData = [
      { day: 'Monday', topic: 'Electrostatics Formulas', risk: 42, level: 'Medium', color: 'var(--warning)' },
      { day: 'Tuesday', topic: 'Chemical Bonding Theory', risk: 68, level: 'High', color: 'var(--danger)' },
      { day: 'Wednesday', topic: 'Organic Chemistry Conversions', risk: 89, level: 'High', color: 'var(--danger)' },
      { day: 'Thursday', topic: 'Integral Calculus Formulas', risk: 55, level: 'Medium', color: 'var(--warning)' },
      { day: 'Friday', topic: 'Vector Algebra Concepts', risk: 48, level: 'Medium', color: 'var(--warning)' },
      { day: 'Saturday', topic: 'Rotational Dynamics', risk: 78, level: 'High', color: 'var(--danger)' },
      { day: 'Sunday', topic: 'Cumulative Revision Quiz', risk: 36, level: 'Low', color: 'var(--success)' },
    ]

    summaryStats = [
      { value: 'Wednesday', label: 'Peak Struggle Day' },
      { value: '59.4%', label: 'Avg Risk Probability' },
      { value: 'Organic Chem', label: 'Primary Pain Point' },
      { value: '6 Topics', label: 'Revision Required' },
    ]

    recommendations = [
      {
        title: 'Urgent: Chemistry Intervention',
        desc: 'Twin predicts 89% struggle risk on Wednesday. Dedicate 90 minutes to organic reaction mechanisms immediately.',
        type: 'danger',
        icon: '🚨'
      },
      {
        title: 'Physics Reinforcement',
        desc: 'Rotational dynamics has a 78% struggle probability on Saturday. Extend study by 1.5 hours.',
        type: 'danger',
        icon: '🚨'
      },
      {
        title: 'Build Study Routine',
        desc: 'Consistent daily revision of 30 minutes can reduce cumulative risk by 15%.',
        type: 'warning',
        icon: '⚠️'
      }
    ]

    heatmapData = [
      { subject: 'Mathematics', mon: 35, tue: 32, wed: 55, thu: 48, fri: 38 },
      { subject: 'Chemistry', mon: 45, tue: 68, wed: 89, thu: 52, fri: 48 },
      { subject: 'Physics', mon: 42, tue: 40, wed: 52, thu: 58, fri: 78 },
      { subject: 'English Lit.', mon: 22, tue: 18, wed: 28, thu: 25, fri: 20 },
      { subject: 'Computer Sci.', mon: 15, tue: 12, wed: 22, thu: 20, fri: 18 }
    ]
  } else if (profile === 'strong') {
    headerAvgRisk = '13.4%'
    headerDecayWarns = '0 Topics'

    forecastData = [
      { day: 'Monday', topic: 'Electrostatics Formulas', risk: 8, level: 'Low', color: 'var(--success)' },
      { day: 'Tuesday', topic: 'Chemical Bonding Theory', risk: 15, level: 'Low', color: 'var(--success)' },
      { day: 'Wednesday', topic: 'Organic Chemistry Conversions', risk: 24, level: 'Low', color: 'var(--success)' },
      { day: 'Thursday', topic: 'Integral Calculus Formulas', risk: 10, level: 'Low', color: 'var(--success)' },
      { day: 'Friday', topic: 'Vector Algebra Concepts', risk: 6, level: 'Low', color: 'var(--success)' },
      { day: 'Saturday', topic: 'Rotational Dynamics', risk: 18, level: 'Low', color: 'var(--success)' },
      { day: 'Sunday', topic: 'Cumulative Revision Quiz', risk: 5, level: 'Low', color: 'var(--success)' },
    ]

    summaryStats = [
      { value: 'Wednesday', label: 'Peak Struggle Day' },
      { value: '13.4%', label: 'Avg Risk Probability' },
      { value: 'None Critical', label: 'Primary Pain Point' },
      { value: '0 Topics', label: 'Revision Required' },
    ]

    recommendations = [
      {
        title: 'Advanced Challenge: Organic Chem',
        desc: 'Your retention is strong. Attempt 5 advanced mechanism questions to push mastery above 95%.',
        type: 'success',
        icon: '✅'
      },
      {
        title: 'Maintain Physics Momentum',
        desc: 'Rotational dynamics is stable at 18% risk. Keep up daily 20-minute recall sessions.',
        type: 'success',
        icon: '✅'
      },
      {
        title: 'Explore Competitive Problems',
        desc: 'Your baseline is strong enough for JEE-level problems. Try 3 advanced calculus challenges.',
        type: 'success',
        icon: '✅'
      }
    ]

    heatmapData = [
      { subject: 'Mathematics', mon: 5, tue: 4, wed: 10, thu: 6, fri: 5 },
      { subject: 'Chemistry', mon: 8, tue: 15, wed: 24, thu: 10, fri: 8 },
      { subject: 'Physics', mon: 10, tue: 8, wed: 12, thu: 14, fri: 18 },
      { subject: 'English Lit.', mon: 3, tue: 2, wed: 5, thu: 4, fri: 3 },
      { subject: 'Computer Sci.', mon: 2, tue: 2, wed: 4, thu: 3, fri: 2 }
    ]
  } else {
    // average / standard
    headerAvgRisk = '38.3%'
    headerDecayWarns = '4 Topics'

    forecastData = [
      { day: 'Monday', topic: 'Electrostatics Formulas', risk: 15, level: 'Low', color: 'var(--success)' },
      { day: 'Tuesday', topic: 'Chemical Bonding Theory', risk: 45, level: 'Medium', color: 'var(--warning)' },
      { day: 'Wednesday', topic: 'Organic Chemistry Conversions', risk: 78, level: 'High', color: 'var(--danger)' },
      { day: 'Thursday', topic: 'Integral Calculus Formulas', risk: 32, level: 'Low', color: 'var(--success)' },
      { day: 'Friday', topic: 'Vector Algebra Concepts', risk: 24, level: 'Low', color: 'var(--success)' },
      { day: 'Saturday', topic: 'Rotational Dynamics', risk: 62, level: 'Medium', color: 'var(--warning)' },
      { day: 'Sunday', topic: 'Cumulative Revision Quiz', risk: 12, level: 'Low', color: 'var(--success)' },
    ]

    summaryStats = [
      { value: 'Wednesday', label: 'Peak Struggle Day' },
      { value: '38.3%', label: 'Avg Risk Probability' },
      { value: 'Organic Chem', label: 'Primary Pain Point' },
      { value: '4 Topics', label: 'Revision Required' },
    ]

    recommendations = [
      {
        title: 'Active Recall: Chemistry',
        desc: 'Active twin predicts a 78% drop in Wednesday\'s session. Revise reaction mechanisms for 45 minutes.',
        type: 'danger',
        icon: '🚨'
      },
      {
        title: 'Practice Extension: Physics',
        desc: 'Rotational dynamics has a 62% struggle probability on Saturday. Extend study window by 1 hour.',
        type: 'warning',
        icon: '⚠️'
      },
      {
        title: 'Sustain Plan: Maths & vectors',
        desc: 'Performance pacing closely with twin target. Keep up current revision consistency.',
        type: 'success',
        icon: '✅'
      }
    ]

    heatmapData = [
      { subject: 'Mathematics', mon: 15, tue: 12, wed: 32, thu: 24, fri: 18 },
      { subject: 'Chemistry', mon: 22, tue: 45, wed: 78, thu: 35, fri: 28 },
      { subject: 'Physics', mon: 30, tue: 28, wed: 35, thu: 40, fri: 62 },
      { subject: 'English Lit.', mon: 10, tue: 8, wed: 15, thu: 12, fri: 10 },
      { subject: 'Computer Sci.', mon: 5, tue: 5, wed: 10, thu: 12, fri: 8 }
    ]
  }

  const getCellClass = (val) => {
    if (val >= 70) return 'cell-high'
    if (val >= 40) return 'cell-med'
    return 'cell-low'
  }

  return (
    <div className="forecast-page fadeUp" id="forecast-page">
      {/* Section 1: Forecast Summary Header */}
      <div className="card">
        <div className="forecast-intro-grid">
          <div className="forecast-intro-left">
            <h2 className="forecast-intro-title">Struggle Risk Forecast</h2>
            <span className="forecast-intro-sub">Simulated predictive struggle probability path: June 18 - June 24</span>
          </div>
          <div className="forecast-stat-chips-row">
            <div className="forecast-stat-chip">
              <span className="forecast-chip-val" style={{ color: 'var(--danger)' }}>Wed</span>
              <span className="forecast-chip-lbl">Peak Risk Day</span>
            </div>
            <div className="forecast-stat-chip">
              <span className="forecast-chip-val">{headerAvgRisk}</span>
              <span className="forecast-chip-lbl">Avg Weekly Risk</span>
            </div>
            <div className="forecast-stat-chip">
              <span className="forecast-chip-val">{headerDecayWarns}</span>
              <span className="forecast-chip-lbl">Decay Warns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Weekly Risk Rows & Chart */}
      <div className="forecast-top-row">
        {/* Forecast Rows Card */}
        <div className="card">
          <h3 className="card-title">7-Day Study Struggle Forecast</h3>
          <div className="forecast-rows-card" style={{ marginTop: '12px' }}>
            {forecastData.map((item, idx) => (
              <div key={idx} className="forecast-row-item">
                <span className="forecast-day-label">{item.day}</span>
                <span className="forecast-topic">{item.topic}</span>
                <div className="forecast-risk-bar-wrapper">
                  <div className="progress-bar-container">
                    <div 
                      className="progress-bar-fill" 
                      style={{ width: `${item.risk}%`, backgroundColor: item.color }}
                    ></div>
                  </div>
                  <span className="forecast-risk-percent">{item.risk}%</span>
                </div>
                <div className="forecast-badge-col">
                  <span className={`pill ${
                    item.level === 'High' ? 'pill-danger' : 
                    item.level === 'Medium' ? 'pill-warning' : 'pill-success'
                  }`}>
                    {item.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Struggle Probability Chart */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 className="card-title">Daily Struggle Probability</h3>
          <div style={{ width: '100%', flex: 1, minHeight: 200, marginTop: '12px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={forecastData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF1FF" />
                <XAxis dataKey="day" tickFormatter={(day) => day.slice(0, 3)} stroke="#8888AA" style={{ fontSize: 10, fontFamily: 'var(--font-body)' }} />
                <YAxis stroke="#8888AA" style={{ fontSize: 10 }} domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="risk" name="Struggle Risk" radius={[4, 4, 0, 0]}>
                  {forecastData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Weekly Summary Row inside side card */}
          <div className="weekly-summary-stats" style={{ borderTop: '1px solid var(--border)', paddingTop: '12px', marginTop: '12px' }}>
            {summaryStats.map((stat, idx) => (
              <div key={idx} className="summary-stat-item">
                <div className="summary-stat-value">{stat.value}</div>
                <div className="summary-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 3: AI Recommendations */}
      <div className="card">
        <h3 className="card-title">🤖 AI Recommended Actions</h3>
        <div className="forecast-grid-3col" style={{ marginTop: '12px' }}>
          {recommendations.map((rec, idx) => (
            <div key={idx} className={`rec-card-with-checkbox rec-${rec.type}`}>
              <div className="rec-card-top">
                <span className="rec-card-icon">{rec.icon}</span>
                <div className="rec-card-text">
                  <span className="rec-card-title">{rec.title}</span>
                  <span className="rec-card-desc">{rec.desc}</span>
                </div>
              </div>
              <div 
                className="rec-card-action-row" 
                onClick={() => toggleDone(idx)}
                style={{ color: doneStates[idx] ? 'var(--success)' : 'var(--text-secondary)' }}
              >
                <input 
                  type="checkbox" 
                  checked={doneStates[idx]} 
                  onChange={() => {}} // handled by click container
                />
                <span>{doneStates[idx] ? 'Completed' : 'Mark as completed'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Heatmap Grid */}
      <div className="card">
        <h3 className="card-title">Struggle Heatmap Matrix</h3>
        <div className="heatmap-subject-row" style={{ marginTop: '12px' }}>
          {/* Heatmap column headers */}
          <div className="heatmap-row-header" style={{ border: 'none', backgroundColor: 'transparent' }}>
            <div className="heatmap-subject-label-cell" style={{ border: 'none', backgroundColor: 'transparent', color: 'var(--text-muted)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Subject</div>
            <div className="heatmap-cells-wrapper">
              <div className="heatmap-cell cell-none" style={{ fontSize: '9.5px', textTransform: 'uppercase', fontWeight: 700 }}>Mon</div>
              <div className="heatmap-cell cell-none" style={{ fontSize: '9.5px', textTransform: 'uppercase', fontWeight: 700 }}>Tue</div>
              <div className="heatmap-cell cell-none" style={{ fontSize: '9.5px', textTransform: 'uppercase', fontWeight: 700 }}>Wed</div>
              <div className="heatmap-cell cell-none" style={{ fontSize: '9.5px', textTransform: 'uppercase', fontWeight: 700 }}>Thu</div>
              <div className="heatmap-cell cell-none" style={{ fontSize: '9.5px', textTransform: 'uppercase', fontWeight: 700 }}>Fri</div>
            </div>
          </div>

          {/* Heatmap Subject Rows */}
          {heatmapData.map((row, idx) => (
            <div key={idx} className="heatmap-row-header">
              <div className="heatmap-subject-label-cell">{row.subject}</div>
              <div className="heatmap-cells-wrapper">
                <div className={`heatmap-cell ${getCellClass(row.mon)}`}>{row.mon}%</div>
                <div className={`heatmap-cell ${getCellClass(row.tue)}`}>{row.tue}%</div>
                <div className={`heatmap-cell ${getCellClass(row.wed)}`}>{row.wed}%</div>
                <div className={`heatmap-cell ${getCellClass(row.thu)}`}>{row.thu}%</div>
                <div className={`heatmap-cell ${getCellClass(row.fri)}`}>{row.fri}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Forecast
