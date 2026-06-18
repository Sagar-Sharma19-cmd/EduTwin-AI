import { useState } from 'react'
import axios from 'axios'
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-recharts-tooltip">
        <div className="tooltip-title">{label}</div>
        {payload.map((entry, index) => (
          <div key={index} className="tooltip-row" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: entry.color || entry.stroke, display: 'inline-block' }}></span>
            <span>{entry.name}: {entry.value.toFixed(1)} / 20</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

function Predictor() {
  const [formData, setFormData] = useState({
    name: 'Sagar Sharma',
    age: '17',
    sex: 'M',
    address: 'U',
    Medu: '4',
    Fedu: '3',
    traveltime: '1',
    studytime: '3',
    failures: '0',
    absences: '2',
    G1: '12',
    G2: '13',
    activities: 'no',
    internet: 'yes',
    higher: 'yes'
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [prediction, setPrediction] = useState(null)
  const [trajectoryData, setTrajectoryData] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setSuccess(false)
    setError(null)
  }

  const generateTrajectory = (g2, predictedGrade, studytime, risk) => {
    const w1 = parseFloat(g2)
    const w2 = predictedGrade
    const hourlyBonus = parseFloat(studytime) * 0.2
    const riskPenalty = parseFloat(risk) * 0.02
    
    const w3 = Math.max(0, Math.min(20, predictedGrade + hourlyBonus - riskPenalty + 0.1))
    const w4 = Math.max(0, Math.min(20, w3 + hourlyBonus * 1.5 - riskPenalty * 1.5 - 0.2))

    return [
      { week: 'Wk 1 (Past)', Grade: parseFloat(w1.toFixed(1)) },
      { week: 'Wk 2 (Predict)', Grade: parseFloat(w2.toFixed(1)) },
      { week: 'Wk 3 (Target)', Grade: parseFloat(w3.toFixed(1)) },
      { week: 'Wk 4 (Target)', Grade: parseFloat(w4.toFixed(1)) },
    ]
  }

  const performPrediction = async (payloadToSubmit) => {
    setLoading(true)
    setError(null)
    setSuccess(false)
    setPrediction(null)

    try {
      const response = await axios.post('http://localhost:8000/predict', payloadToSubmit)
      const data = response.data
      setPrediction(data)
      setSuccess(true)
      
      const trajectory = generateTrajectory(
        payloadToSubmit.G2,
        data.predicted_grade,
        payloadToSubmit.studytime,
        data.struggle_risk
      )
      setTrajectoryData(trajectory)
    } catch (err) {
      console.error(err)
      setError('Backend API server connection failed. Start Python backend on port 8000.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      name: formData.name,
      age: parseInt(formData.age, 10) || 17,
      sex: formData.sex,
      address: formData.address,
      Medu: parseInt(formData.Medu, 10),
      Fedu: parseInt(formData.Fedu, 10),
      traveltime: parseInt(formData.traveltime, 10),
      studytime: parseInt(formData.studytime, 10),
      failures: parseInt(formData.failures, 10),
      absences: parseInt(formData.absences, 10),
      G1: parseFloat(formData.G1),
      G2: parseFloat(formData.G2),
      activities: formData.activities,
      internet: formData.internet,
      higher: formData.higher
    }
    performPrediction(payload)
  }

  const loadWeakDemo = () => {
    const weakData = {
      name: 'Priya Patel',
      age: '18',
      sex: 'F',
      address: 'R',
      Medu: '1',
      Fedu: '1',
      traveltime: '3',
      studytime: '1',
      failures: '3',
      absences: '14',
      G1: '6',
      G2: '5',
      activities: 'no',
      internet: 'no',
      higher: 'no'
    }
    setFormData(weakData)
    performPrediction(weakData)
  }

  const loadStrongDemo = () => {
    const strongData = {
      name: 'Aarav Sharma',
      age: '16',
      sex: 'M',
      address: 'U',
      Medu: '4',
      Fedu: '4',
      traveltime: '1',
      studytime: '4',
      failures: '0',
      absences: '0',
      G1: '17',
      G2: '18',
      activities: 'yes',
      internet: 'yes',
      higher: 'yes'
    }
    setFormData(strongData)
    performPrediction(strongData)
  }

  const getRiskColor = (risk) => {
    if (risk > 65) return 'var(--danger)'
    if (risk > 35) return 'var(--warning)'
    return 'var(--success)'
  }

  const getRecBgColor = (risk) => {
    if (risk > 65) return 'rgba(239, 68, 68, 0.05)'
    if (risk > 35) return 'rgba(245, 158, 11, 0.05)'
    return 'rgba(34, 197, 94, 0.05)'
  }

  const getSubmitBtnClass = () => {
    let base = 'btn-predict-large'
    if (success) base += ' btn-predict-success'
    if (error) base += ' btn-predict-error'
    return base
  }

  return (
    <div className="predictor-page fadeUp" id="predictor-page">
      <div className="predictor-header-area">
        <h2 className="predictor-page-title">Cognitive Twin Simulator</h2>
        <span className="predictor-page-sub">Calibrate educational attributes to simulate academic trajectories.</span>
      </div>

      <div className="predictor-layout-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
        {/* Left: Input Form */}
        <div className="card">
          <h3 className="card-title">🔬 Digital Twin Metric Inputs</h3>
          <form onSubmit={handleSubmit} className="predictor-form" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
            <div className="predictor-grid-2col">
              <div className="form-group-custom">
                <label htmlFor="name">Student Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input-custom"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group-custom">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  className="form-input-custom"
                  value={formData.age}
                  onChange={handleChange}
                  min="15"
                  max="22"
                  required
                />
              </div>

              <div className="form-group-custom">
                <label htmlFor="G1">G1 Term 1 Grade (0 - 20)</label>
                <input
                  type="number"
                  id="G1"
                  name="G1"
                  className="form-input-custom"
                  value={formData.G1}
                  onChange={handleChange}
                  min="0"
                  max="20"
                  step="0.1"
                  required
                />
              </div>

              <div className="form-group-custom">
                <label htmlFor="G2">G2 Term 2 Grade (0 - 20)</label>
                <input
                  type="number"
                  id="G2"
                  name="G2"
                  className="form-input-custom"
                  value={formData.G2}
                  onChange={handleChange}
                  min="0"
                  max="20"
                  step="0.1"
                  required
                />
              </div>

              <div className="form-group-custom">
                <label htmlFor="studytime">Weekly Study Time</label>
                <select
                  id="studytime"
                  name="studytime"
                  className="form-input-custom"
                  value={formData.studytime}
                  onChange={handleChange}
                >
                  <option value="1">1: &lt;2 hours</option>
                  <option value="2">2: 2 to 5 hours</option>
                  <option value="3">3: 5 to 10 hours</option>
                  <option value="4">4: &gt;10 hours</option>
                </select>
              </div>

              <div className="form-group-custom">
                <label htmlFor="failures">Past Class Failures</label>
                <select
                  id="failures"
                  name="failures"
                  className="form-input-custom"
                  value={formData.failures}
                  onChange={handleChange}
                >
                  <option value="0">0 failures</option>
                  <option value="1">1 failure</option>
                  <option value="2">2 failures</option>
                  <option value="3">3 failures</option>
                  <option value="4">4 failures</option>
                </select>
              </div>

              <div className="form-group-custom">
                <label htmlFor="absences">Absences Count</label>
                <input
                  type="number"
                  id="absences"
                  name="absences"
                  className="form-input-custom"
                  value={formData.absences}
                  onChange={handleChange}
                  min="0"
                  max="99"
                  required
                />
              </div>

              <div className="form-group-custom">
                <label htmlFor="traveltime">Travel Time</label>
                <select
                  id="traveltime"
                  name="traveltime"
                  className="form-input-custom"
                  value={formData.traveltime}
                  onChange={handleChange}
                >
                  <option value="1">1: &lt;15 min</option>
                  <option value="2">2: 15 to 30 min</option>
                  <option value="3">3: 30 min to 1 hr</option>
                  <option value="4">4: &gt;1 hour</option>
                </select>
              </div>

              <div className="form-group-custom">
                <label htmlFor="Medu">Mother's Education</label>
                <select
                  id="Medu"
                  name="Medu"
                  className="form-input-custom"
                  value={formData.Medu}
                  onChange={handleChange}
                >
                  <option value="0">0: None</option>
                  <option value="1">1: Primary Education</option>
                  <option value="2">2: 5th to 9th Grade</option>
                  <option value="3">3: Secondary Education</option>
                  <option value="4">4: Higher Education</option>
                </select>
              </div>

              <div className="form-group-custom">
                <label htmlFor="Fedu">Father's Education</label>
                <select
                  id="Fedu"
                  name="Fedu"
                  className="form-input-custom"
                  value={formData.Fedu}
                  onChange={handleChange}
                >
                  <option value="0">0: None</option>
                  <option value="1">1: Primary Education</option>
                  <option value="2">2: 5th to 9th Grade</option>
                  <option value="3">3: Secondary Education</option>
                  <option value="4">4: Higher Education</option>
                </select>
              </div>

              <div className="form-group-custom">
                <label htmlFor="internet">Internet Access</label>
                <select
                  id="internet"
                  name="internet"
                  className="form-input-custom"
                  value={formData.internet}
                  onChange={handleChange}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="form-group-custom">
                <label htmlFor="activities">Extra-Curriculars</label>
                <select
                  id="activities"
                  name="activities"
                  className="form-input-custom"
                  value={formData.activities}
                  onChange={handleChange}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="form-group-custom">
                <label htmlFor="address">Address Setting</label>
                <select
                  id="address"
                  name="address"
                  className="form-input-custom"
                  value={formData.address}
                  onChange={handleChange}
                >
                  <option value="U">Urban (U)</option>
                  <option value="R">Rural (R)</option>
                </select>
              </div>

              <div className="form-group-custom">
                <label htmlFor="higher">Wants Higher Education</label>
                <select
                  id="higher"
                  name="higher"
                  className="form-input-custom"
                  value={formData.higher}
                  onChange={handleChange}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="form-group-custom">
                <label htmlFor="sex">Gender (Sex)</label>
                <select
                  id="sex"
                  name="sex"
                  className="form-input-custom"
                  value={formData.sex}
                  onChange={handleChange}
                >
                  <option value="M">Male (M)</option>
                  <option value="F">Female (F)</option>
                </select>
              </div>
            </div>

            <button type="submit" className={getSubmitBtnClass()} disabled={loading}>
              {loading ? (
                <>⏳ Syncing & Analysing...</>
              ) : error ? (
                <>❌ Connection Error</>
              ) : success ? (
                <>🔮 Twin Projection Synced</>
              ) : (
                <>🔮 Run ML Twin Simulation</>
              )}
            </button>
          </form>

          {/* Quick Demo Triggers */}
          <div className="quick-demo-row">
            <button type="button" className="demo-btn demo-weak" onClick={loadWeakDemo}>
              🔴 Try Weak Student Demo
            </button>
            <button type="button" className="demo-btn demo-strong" onClick={loadStrongDemo}>
              🟢 Try Strong Student Demo
            </button>
          </div>

          {error && (
            <div className="predictor-error-box" id="error-box" style={{ marginTop: '12px', borderLeft: '4px solid var(--danger)', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(239, 68, 68, 0.05)', fontSize: '12px', color: 'var(--danger)', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Right: Results Outputs */}
        <div className="card" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <h3 className="card-title">🔮 ML Twin Projection Output</h3>
          
          {loading && (
            <div className="spinner-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <div className="spinner-circle" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '4px solid var(--border)', borderTopColor: 'var(--accent-primary)', animation: 'spin 1s linear infinite' }}></div>
              <span className="spinner-text" style={{ marginTop: '16px', fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>Syncing with ML Server & Simulating Twin...</span>
            </div>
          )}

          {!loading && !prediction && (
            <div className="empty-state" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, color: 'var(--text-muted)' }}>
              <span className="empty-state-icon" style={{ fontSize: '48px', marginBottom: '12px' }}>🪞</span>
              <p style={{ fontWeight: 500, fontSize: '13px', lineHeight: 1.45, maxWidth: '280px', margin: 0 }}>
                Adjust parameters on the left and trigger simulation to generate predicted scores, risk metrics, and study routines.
              </p>
            </div>
          )}

          {!loading && prediction && (
            <div className="predictor-results-container" style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* Result Hero Cards */}
              <div className="results-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                <div className="result-card-item" style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '12px', textAlign: 'center', backgroundColor: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <span className={`result-card-val ${prediction.predicted_grade >= 10 ? 'grade-green' : prediction.predicted_grade >= 8 ? 'grade-amber' : 'grade-red'}`} style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'var(--font-headings)' }}>
                    {prediction.predicted_grade}
                  </span>
                  <span className="result-card-lbl" style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, marginTop: '2px' }}>Predicted Grade (0-20)</span>
                </div>

                <div className="result-card-item" style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '12px', textAlign: 'center', backgroundColor: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="struggle-risk-gauge-container">
                    <svg width="44" height="44" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="16" fill="none" stroke="var(--border)" strokeWidth="3" />
                      <circle cx="18" cy="18" r="16" fill="none" stroke={getRiskColor(prediction.struggle_risk)} strokeWidth="3" strokeDasharray="100" strokeDashoffset={100 - prediction.struggle_risk} style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }} />
                    </svg>
                    <span className="struggle-risk-gauge-text" style={{ fontSize: '11px' }}>{prediction.struggle_risk}%</span>
                  </div>
                  <span className="result-card-lbl" style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, marginTop: '4px' }}>Struggle Risk</span>
                </div>

                <div className="result-card-item" style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '12px', textAlign: 'center', backgroundColor: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <span className="result-card-val" style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'var(--font-headings)', color: prediction.pass_fail === 'Pass' ? 'var(--success)' : 'var(--danger)' }}>
                    {prediction.pass_fail}
                  </span>
                  <span className="result-card-lbl" style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, marginTop: '2px' }}>{prediction.pass_probability}% Pass Prob</span>
                </div>
              </div>

              {/* Status Pills */}
              <div className="results-meta-pills-row">
                <span className={`pill ${prediction.cluster_group === 'At-Risk' ? 'pill-danger' : prediction.cluster_group === 'High Performer' ? 'pill-success' : 'pill-warning'}`}>
                  Cluster: {prediction.cluster_group}
                </span>
                <span className="pill pill-primary">
                  Forget in: {prediction.forget_in_days} Days
                </span>
                <span className={`pill ${prediction.risk_level === 'High' ? 'pill-danger' : prediction.risk_level === 'Medium' ? 'pill-warning' : 'pill-success'}`}>
                  Risk Level: {prediction.risk_level}
                </span>
              </div>

              {/* AI Recommendation Alert Box */}
              <div className="insight-recommendation-box" style={{ padding: '12px', borderRadius: '12px', borderLeft: `5px solid ${getRiskColor(prediction.struggle_risk)}`, backgroundColor: getRecBgColor(prediction.struggle_risk), fontSize: '12px', lineHeight: 1.4 }}>
                <strong>AI Simulation Recommendation:</strong> {prediction.recommendation}
                <div style={{ marginTop: '4px', fontSize: '10px', color: 'var(--text-muted)' }}>
                  *Based on {formData.activities === 'yes' ? 'active' : 'inactive'} extracurricular status in {formData.address === 'U' ? 'urban' : 'rural'} environment.
                </div>
              </div>

              {/* Expandable Model Details */}
              <details className="models-breakdown-details">
                <summary className="models-breakdown-summary">
                  <span>🔬 Ensemble Model Contribution breakdown</span>
                  <span className="models-breakdown-summary-arrow">▶</span>
                </summary>
                <div className="models-breakdown-content">
                  <div className="model-insight-cell">
                    <span className="model-insight-name">Linear Regression</span>
                    <span className="model-insight-value">Grade: {prediction.model_insights.linear_regression.predicted_grade.toFixed(1)}</span>
                  </div>
                  <div className="model-insight-cell">
                    <span className="model-insight-name">Logistic Regression</span>
                    <span className="model-insight-value">{prediction.model_insights.logistic_regression.prediction} ({prediction.model_insights.logistic_regression.probability.toFixed(0)}%)</span>
                  </div>
                  <div className="model-insight-cell">
                    <span className="model-insight-name">Naive Bayes</span>
                    <span className="model-insight-value">Style: {prediction.model_insights.naive_bayes.learning_style}</span>
                  </div>
                  <div className="model-insight-cell">
                    <span className="model-insight-name">SVM Anomaly Detector</span>
                    <span className="model-insight-value">{prediction.model_insights.svm.anomaly_detected ? '⚠️ Flagged Anomaly' : 'Normal Trajectory'}</span>
                  </div>
                  <div className="model-insight-cell">
                    <span className="model-insight-name">Decision Tree</span>
                    <span className="model-insight-value">Key: {prediction.model_insights.decision_tree.top_factor}</span>
                  </div>
                  <div className="model-insight-cell">
                    <span className="model-insight-name">Random Forest</span>
                    <span className="model-insight-value">Risk: {prediction.model_insights.random_forest.struggle_risk}%</span>
                  </div>
                  <div className="model-insight-cell">
                    <span className="model-insight-name">KMeans Cluster</span>
                    <span className="model-insight-value">Group {prediction.model_insights.kmeans.cluster} ({prediction.model_insights.kmeans.group})</span>
                  </div>
                  <div className="model-insight-cell">
                    <span className="model-insight-name">GMM Probabilities</span>
                    <span className="model-insight-value" style={{ fontSize: '10.5px' }}>
                      L:{(prediction.model_insights.gmm.probabilities[0]*100).toFixed(0)}% | 
                      M:{(prediction.model_insights.gmm.probabilities[1]*100).toFixed(0)}% | 
                      H:{(prediction.model_insights.gmm.probabilities[2]*100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </details>

              {/* Trajectory line chart */}
              <div>
                <h4 style={{ fontSize: '12.5px', fontWeight: 800, marginBottom: '6px', fontFamily: 'var(--font-headings)', color: 'var(--text-primary)' }}>4-Week Grade Trajectory Prediction</h4>
                <div style={{ width: '100%', height: 160 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trajectoryData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#EEF1FF" />
                      <XAxis dataKey="week" stroke="#8888AA" style={{ fontSize: 9, fontFamily: 'var(--font-body)' }} />
                      <YAxis stroke="#8888AA" style={{ fontSize: 9 }} domain={[0, 20]} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line 
                        type="monotone" 
                        dataKey="Grade" 
                        name="Projected Grade" 
                        stroke="var(--accent-primary)" 
                        strokeWidth={2.5} 
                        activeDot={{ r: 5 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Study Routine */}
              <div>
                <h4 style={{ fontSize: '12.5px', fontWeight: 800, marginBottom: '8px', fontFamily: 'var(--font-headings)', color: 'var(--text-primary)' }}>Simulated Study Plan</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {prediction.study_plan.map((item, idx) => (
                    <div key={idx} className={`study-plan-card-item priority-${item.priority.toLowerCase()}`} style={{ padding: '8px 12px' }}>
                      <div className="study-plan-time-badge" style={{ width: '64px', fontSize: '11px' }}>{item.time}</div>
                      <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border)' }}></div>
                      <div style={{ flex: 1, fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                        {item.task}
                      </div>
                      <span className={`pill ${item.priority === 'High' ? 'pill-danger' : item.priority === 'Medium' ? 'pill-warning' : 'pill-success'}`} style={{ fontSize: '9px', padding: '2px 8px' }}>
                        {item.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SDG Alignment Footer */}
              <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: '10px', display: 'flex', gap: '6px' }}>
                <span>🌍</span>
                <span>{prediction.sdg_impact}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Keyframe animation for spinner */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default Predictor
