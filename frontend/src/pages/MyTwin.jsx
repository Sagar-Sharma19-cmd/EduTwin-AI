import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  BarChart, 
  Bar,
  Cell
} from 'recharts'
import { getCognitiveProfile, getNormalizedHours } from '../utils/profile'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-recharts-tooltip">
        <div className="tooltip-title">{label}</div>
        {payload.map((entry, index) => (
          <div key={index} className="tooltip-row" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: entry.color || entry.stroke, display: 'inline-block' }}></span>
            <span>{entry.name}: {entry.value}%</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

function MyTwin() {
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

  const profile = getCognitiveProfile()
  const studyHoursText = getNormalizedHours()
  
  let twinMatchVal = 87
  let heroAlertText = (
    <>
      🔴 <strong>Overconfidence Alert in Chemistry:</strong> Your self-evaluation of 88% mastery significantly exceeds the actual model-assessed capability of 45%. Review fundamentals.
    </>
  )

  let radarData = []
  let progressData = []
  let retentionData = []
  let studyPlan = []
  let insights = []

  if (profile === 'weak') {
    twinMatchVal = 68
    heroAlertText = (
      <>
        🔴 <strong>Intervention Alert:</strong> Multiple topic decays detected. Your self-evaluation in Chemistry (80%) exceeds model-calibrated capabilities (35%). Revision recommended.
      </>
    )
    
    radarData = [
      { subject: 'Maths', Actual: 55, Estimate: 72 },
      { subject: 'Physics', Actual: 48, Estimate: 68 },
      { subject: 'Chemistry', Actual: 35, Estimate: 80 },
      { subject: 'English Lit.', Actual: 62, Estimate: 70 },
      { subject: 'Biology', Actual: 50, Estimate: 65 },
      { subject: 'Computer Sci.', Actual: 58, Estimate: 75 },
    ]
    
    progressData = [
      { name: 'Test 1', Actual: 50, Twin: 60 },
      { name: 'Test 2', Actual: 52, Twin: 62 },
      { name: 'Test 3', Actual: 48, Twin: 63 },
      { name: 'Test 4', Actual: 55, Twin: 65 },
      { name: 'Test 5', Actual: 54, Twin: 66 },
      { name: 'Test 6', Actual: 58, Twin: 68 },
    ]
    
    retentionData = [
      { topic: 'Electrostatics', retention: 62, color: 'var(--warning)' },
      { topic: 'Kinetics', retention: 41, color: 'var(--danger)' },
      { topic: 'Limits', retention: 18, color: 'var(--danger)' },
    ]
    
    studyPlan = [
      { 
        time: '09:00 AM', 
        subject: 'Chemistry',
        icon: '🧪',
        desc: 'Urgent Recovery: Focus on Redox reactions and basic equations.',
        priority: 'high',
      },
      { 
        time: '11:00 AM', 
        subject: 'Maths',
        icon: '🧮',
        desc: 'Concept Check: Complete 5 basic quotient derivatives.',
        priority: 'medium',
      },
    ]
    
    insights = [
      {
        title: 'Chemistry Knowledge Gap',
        desc: 'Your self-estimate is 80% but active twin modeling suggests 35% skill mastery.',
        type: 'danger',
        icon: '🚨'
      },
      {
        title: 'High Memory Decay',
        desc: 'Calculus Limits retention has decayed to 18%. Immediate review session recommended.',
        type: 'danger',
        icon: '🚨'
      },
      {
        title: 'Study Routine Alert',
        desc: `Your baseline study hours (${studyHoursText}/day) are insufficient for Class 11B syllabus.`,
        type: 'warning',
        icon: '⚠️'
      }
    ]
  } else if (profile === 'strong') {
    twinMatchVal = 96
    heroAlertText = (
      <>
        🟢 <strong>Strong Cognitive Alignment:</strong> Your self-evaluation closely maps model-assessed capability. Twin Match score is an exceptional 96%. Keep up the consistency!
      </>
    )
    
    radarData = [
      { subject: 'Maths', Actual: 92, Estimate: 90 },
      { subject: 'Physics', Actual: 88, Estimate: 90 },
      { subject: 'Chemistry', Actual: 85, Estimate: 84 },
      { subject: 'English Lit.', Actual: 82, Estimate: 80 },
      { subject: 'Biology', Actual: 90, Estimate: 88 },
      { subject: 'Computer Sci.', Actual: 95, Estimate: 94 },
    ]
    
    progressData = [
      { name: 'Test 1', Actual: 85, Twin: 84 },
      { name: 'Test 2', Actual: 88, Twin: 87 },
      { name: 'Test 3', Actual: 90, Twin: 89 },
      { name: 'Test 4', Actual: 92, Twin: 91 },
      { name: 'Test 5', Actual: 94, Twin: 93 },
      { name: 'Test 6', Actual: 96, Twin: 95 },
    ]
    
    retentionData = [
      { topic: 'Electrostatics', retention: 95, color: 'var(--success)' },
      { topic: 'Kinetics', retention: 84, color: 'var(--success)' },
      { topic: 'Limits', retention: 72, color: 'var(--success)' },
    ]
    
    studyPlan = [
      { 
        time: '09:00 AM', 
        subject: 'Maths',
        icon: '🧮',
        desc: 'Advanced Challenge: Solve 15 advanced quotient derivatives.',
        priority: 'high',
      },
      { 
        time: '11:30 AM', 
        subject: 'Physics',
        icon: '⚡',
        desc: 'Derive induction coefficients for co-axial solenoids.',
        priority: 'medium',
      },
      { 
        time: '02:00 PM', 
        subject: 'Computer Sci.',
        icon: '💻',
        desc: 'Active recall check: Implement graph traversal algorithms.',
        priority: 'low',
      }
    ]
    
    insights = [
      {
        title: 'Exceptional Concept Mastery',
        desc: 'Mathematics and Computer Science are pacing at >90% cognitive retention.',
        type: 'good',
        icon: '💡'
      },
      {
        title: 'Strong Study Discipline',
        desc: `Your consistent study allocation (${studyHoursText}/day) keeps forgetting curves stable.`,
        type: 'good',
        icon: '💡'
      },
      {
        title: 'Limits Retention Check',
        desc: 'Calculus Limits retention is at 72%. A quick 10-minute active recall is ideal.',
        type: 'warning',
        icon: '⚠️'
      }
    ]
  } else {
    // average / standard
    twinMatchVal = 87
    heroAlertText = (
      <>
        🔴 <strong>Overconfidence Alert in Chemistry:</strong> Your self-evaluation of 88% mastery significantly exceeds the actual model-assessed capability of 45%. Review fundamentals.
      </>
    )
    
    radarData = [
      { subject: 'Maths', Actual: 85, Estimate: 80 },
      { subject: 'Physics', Actual: 72, Estimate: 75 },
      { subject: 'Chemistry', Actual: 45, Estimate: 88 },
      { subject: 'English Lit.', Actual: 78, Estimate: 75 },
      { subject: 'Biology', Actual: 65, Estimate: 70 },
      { subject: 'Computer Sci.', Actual: 90, Estimate: 88 },
    ]
    
    progressData = [
      { name: 'Test 1', Actual: 68, Twin: 70 },
      { name: 'Test 2', Actual: 72, Twin: 74 },
      { name: 'Test 3', Actual: 70, Twin: 77 },
      { name: 'Test 4', Actual: 78, Twin: 81 },
      { name: 'Test 5', Actual: 82, Twin: 85 },
      { name: 'Test 6', Actual: 89, Twin: 91 },
    ]
    
    retentionData = [
      { topic: 'Electrostatics', retention: 85, color: 'var(--success)' },
      { topic: 'Kinetics', retention: 58, color: 'var(--warning)' },
      { topic: 'Limits', retention: 32, color: 'var(--danger)' },
    ]
    
    studyPlan = [
      { 
        time: '09:00 AM', 
        subject: 'Chemistry',
        icon: '🧪',
        desc: 'Gap Bridging: Focus on Redox Reaction foundation equations.',
        priority: 'high',
      },
      { 
        time: '11:30 AM', 
        subject: 'Maths',
        icon: '🧮',
        desc: 'Practice Routine: Solve 10 advanced quotient derivatives.',
        priority: 'medium',
      },
      { 
        time: '02:00 PM', 
        subject: 'Physics',
        icon: '⚡',
        desc: 'Active Recall: Explain Faraday\'s induction law to the twin.',
        priority: 'low',
      },
      { 
        time: '04:30 PM', 
        subject: 'English',
        icon: '📖',
        desc: 'Feedback Review: Redraft essay transitions from AI notes.',
        priority: 'low',
      }
    ]
    
    insights = [
      {
        title: 'Chemistry Knowledge Gap',
        desc: 'Your self-estimate is 88% but active twin modeling suggests 45% skill mastery.',
        type: 'danger',
        icon: '🚨'
      },
      {
        title: 'Mathematics Retention High',
        desc: 'Excellent decay response. Memory curves predict 85% retention over 6 days.',
        type: 'good',
        icon: '💡'
      },
      {
        title: 'Calculus Limits Action Required',
        desc: 'Calculus Limits decay predicted to drop below 30% retention by tomorrow.',
        type: 'warning',
        icon: '⚠️'
      }
    ]
  }

  return (
    <div className="mytwin-page fadeUp" id="mytwin-page">
      {/* Section 1: Profile Hero Header Card */}
      <div className="profile-hero-card">
        <div className="profile-hero-top">
          <div className="profile-hero-avatar-area">
            <div className="profile-avatar-giant-lavender">{initials}</div>
            <div className="profile-hero-details">
              <h2 className="profile-hero-name">{userName}</h2>
              <span className="profile-hero-meta">{userClass} · AI Cognitive Digital Twin</span>
            </div>
          </div>
          <div className="profile-hero-stats-row">
            <div className="profile-hero-stat-box">
              <div className="profile-hero-stat-val">{userClass}</div>
              <div className="profile-hero-stat-lbl">Class</div>
            </div>
            <div className="profile-hero-stat-box">
              <div className="profile-hero-stat-val">{twinMatchVal}%</div>
              <div className="profile-hero-stat-lbl">Twin Match</div>
            </div>
            <div className="profile-hero-stat-box">
              <div className="profile-hero-stat-val">{studyHoursText}</div>
              <div className="profile-hero-stat-lbl">Daily Study</div>
            </div>
          </div>
        </div>
        <div 
          className="profile-hero-alert-box" 
          style={profile === 'strong' ? { backgroundColor: 'rgba(34, 197, 94, 0.15)', borderColor: 'rgba(34, 197, 94, 0.25)' } : {}}
        >
          {heroAlertText}
        </div>
      </div>

      {/* Section 2: Core Visualizations */}
      <div className="mytwin-three-col-grid">
        {/* Knowledge Gap Radar */}
        <div className="card">
          <h3 className="card-title">Cognitive Radar Profile</h3>
          <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#EEF1FF" />
                <PolarAngleAxis dataKey="subject" stroke="#8888AA" style={{ fontSize: 9, fontFamily: 'var(--font-body)' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#8888AA" style={{ fontSize: 8 }} />
                <Radar name="Actual Mastery" dataKey="Actual" stroke="var(--accent-primary)" fill="var(--accent-primary)" fillOpacity={0.3} />
                <Radar name="Self-Estimate" dataKey="Estimate" stroke="var(--accent-secondary)" fill="var(--accent-secondary)" fillOpacity={0.15} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 9, fontFamily: 'var(--font-body)', paddingTop: 5 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-subtitle-caption">
            Overlaps signal alignment; gaps warn of self-estimate bias.
          </div>
        </div>

        {/* Twin Path vs Reality Progress */}
        <div className="card">
          <h3 className="card-title">Twin Path vs Actual Progress</h3>
          <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF1FF" />
                <XAxis dataKey="name" stroke="#8888AA" style={{ fontSize: 9, fontFamily: 'var(--font-body)' }} />
                <YAxis stroke="#8888AA" style={{ fontSize: 9 }} domain={[profile === 'weak' ? 40 : 60, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="Actual" 
                  name="Actual Progress" 
                  stroke="var(--accent-primary)" 
                  strokeWidth={2.5} 
                  activeDot={{ r: 5 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="Twin" 
                  name="Target Path" 
                  stroke="var(--accent-secondary)" 
                  strokeWidth={2} 
                  strokeDasharray="4 4"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-subtitle-caption">
            Twin targets track active cognitive limits.
          </div>
        </div>

        {/* Topic Retention Decay (Horizontal Bar Chart) */}
        <div className="card">
          <h3 className="card-title">Topic Memory Decay</h3>
          <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={retentionData}
                layout="vertical"
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF1FF" />
                <XAxis type="number" domain={[0, 100]} stroke="#8888AA" style={{ fontSize: 9 }} />
                <YAxis type="category" dataKey="topic" stroke="#8888AA" style={{ fontSize: 9, fontFamily: 'var(--font-body)' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="retention" name="Retention" radius={[0, 4, 4, 0]}>
                  {retentionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-subtitle-caption">
            Calculated forgetting curve values over 7 days.
          </div>
        </div>
      </div>

      {/* Section 3: Study & Insight Widgets */}
      <div className="mytwin-two-col-grid">
        {/* Today's AI Study Plan */}
        <div className="card">
          <h3 className="card-title">Today's Twin-Optimized Study Plan</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
            {studyPlan.map((item, idx) => (
              <div key={idx} className={`study-plan-card-item priority-${item.priority}`}>
                <div className="study-plan-time-badge">{item.time}</div>
                <div style={{ width: '1px', height: '30px', backgroundColor: 'var(--border)' }}></div>
                <div className="study-plan-task-details">
                  <div className="study-plan-meta-row">
                    <span className="study-plan-subject-icon">{item.icon}</span>
                    <strong style={{ color: 'var(--text-primary)' }}>{item.subject}</strong>
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '11px', marginTop: '2px' }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="study-total-footer">
            <span>Total Estimated Study Duration</span>
            <span className="pill pill-primary" style={{ padding: '4px 12px' }}>{studyHoursText.replace('h', ' Hrs')}</span>
          </div>
        </div>

        {/* AI Academic Insights */}
        <div className="card">
          <h3 className="card-title">AI Academic Insights</h3>
          <div className="insights-column" style={{ marginTop: '12px' }}>
            {insights.map((insight, idx) => (
              <div key={idx} className={`insight-card-item insight-${insight.type}`}>
                <span className="insight-item-icon">{insight.icon}</span>
                <div className="insight-item-text">
                  <span className="insight-item-title">{insight.title}</span>
                  <span className="insight-item-desc">{insight.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="insights-bottom-meta">
            <div className="twin-match-ring-wrapper">
              <svg width="40" height="40" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="18" cy="18" r="16" fill="none" stroke="var(--border)" strokeWidth="3" />
                <circle cx="18" cy="18" r="16" fill="none" stroke="var(--success)" strokeWidth="3" strokeDasharray="100" strokeDashoffset={100 - twinMatchVal} />
              </svg>
              <div className="twin-match-ring-label">
                <span className="twin-match-pct">{twinMatchVal}%</span>
                <span className="twin-match-text">Twin Alignment</span>
              </div>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
              Updated 5m ago
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyTwin

