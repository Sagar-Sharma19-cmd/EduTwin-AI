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

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-recharts-tooltip">
        <div className="tooltip-title">{label}</div>
        {payload.map((entry, index) => (
          <div key={index} className="tooltip-row" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: entry.color || entry.stroke, display: 'inline-block' }}></span>
            <span>{entry.name}: {entry.value}% Accuracy</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

function Models() {
  // 8 models list
  const models = [
    {
      name: 'Linear Regression',
      unit: 'Unit 2',
      badgeColor: 'pill-primary',
      desc: 'Predicts the exact final grade G3 on a continuous 0-20 scale based on study inputs and historical grades.',
      metric: 'R² = 0.80',
      feature: 'G1 / G2 Grades',
      usecase: 'Continuous final score estimation and gap calculations.'
    },
    {
      name: 'Logistic Regression',
      unit: 'Unit 2',
      badgeColor: 'pill-primary',
      desc: 'Performs binary classification to predict student Pass/Fail status based on historical parameters.',
      metric: 'Accuracy = 78%',
      feature: 'Study Hours & Failures',
      usecase: 'Direct binary pass/fail probability forecasting.'
    },
    {
      name: 'Naive Bayes',
      unit: 'Unit 2',
      badgeColor: 'pill-primary',
      desc: 'Multi-class probabilistic classifier mapping students to the most suitable learning style segment.',
      metric: 'Accuracy = 74%',
      feature: 'Learning Style Encoded',
      usecase: 'Cognitive learning style segmentation.'
    },
    {
      name: 'Support Vector Machine (SVM)',
      unit: 'Unit 3',
      badgeColor: 'pill-secondary',
      desc: 'Detects extreme performance anomalies or high risk boundaries for early student intervention flagging.',
      metric: 'F1-Score = 0.82',
      feature: 'Attendance & Absences',
      usecase: 'Early anomaly detection and cognitive boundary analysis.'
    },
    {
      name: 'Decision Tree',
      unit: 'Unit 3',
      badgeColor: 'pill-secondary',
      desc: 'Constructs sequential rule pathways to output the optimal daily study plan and time allocations.',
      metric: 'Accuracy = 80%',
      feature: 'Study habits & traveltime',
      usecase: 'Formulating sequential study rules.'
    },
    {
      name: 'Random Forest',
      unit: 'Unit 3',
      badgeColor: 'pill-secondary',
      desc: 'Ensemble model combining multiple decision trees to yield the highest predictive accuracy for grade predictions.',
      metric: 'Accuracy = 89%',
      feature: 'Ensemble tree voters',
      usecase: 'Majority-vote prediction of struggle risks.'
    },
    {
      name: 'K-Means Clustering',
      unit: 'Unit 4',
      badgeColor: 'pill-warning',
      desc: 'Unsupervised model clustering students into behavioral cohorts (At-Risk, Average, High Performer).',
      metric: 'Silhouette = 0.58',
      feature: 'G3 & studytime',
      usecase: 'Unsupervised student cohort clustering.'
    },
    {
      name: 'Gaussian Mixture Model (GMM)',
      unit: 'Unit 4',
      badgeColor: 'pill-warning',
      desc: 'Soft clustering algorithm assigning probability profiles across different student clusters.',
      metric: 'Silhouette = 0.52',
      feature: 'Cluster probability distribution',
      usecase: 'Soft classification and student risk profile assignment.'
    }
  ]

  // Classification accuracy comparison
  const accuracyComparisonData = [
    { name: 'Random Forest', accuracy: 89, color: 'var(--accent-primary)' },
    { name: 'SVM Classifier', accuracy: 82, color: 'var(--accent-secondary)' },
    { name: 'Decision Tree', accuracy: 80, color: 'var(--accent-light)' },
    { name: 'Logistic Regression', accuracy: 78, color: 'var(--success)' },
    { name: 'Naive Bayes', accuracy: 74, color: 'var(--warning)' },
  ]

  return (
    <div className="models-page fadeUp" id="models-page">
      {/* Section 1: Intro Header */}
      <div className="models-intro-header">
        <div className="models-intro-left">
          <h2 className="models-intro-title">ML Models & Cognitive Engine</h2>
          <span className="models-intro-sub">Explore the architecture of all 8 Machine Learning models powering the student digital twin.</span>
        </div>
        <div className="forecast-stat-chips-row">
          <div className="forecast-stat-chip">
            <span className="forecast-chip-val">8 Built</span>
            <span className="forecast-chip-lbl">Total Models</span>
          </div>
          <div className="forecast-stat-chip">
            <span className="forecast-chip-val" style={{ color: 'var(--success)' }}>93%</span>
            <span className="forecast-chip-lbl">Best Accuracy</span>
          </div>
          <div className="forecast-stat-chip">
            <span className="forecast-chip-val">Unit 2-4</span>
            <span className="forecast-chip-lbl">Syllabus Range</span>
          </div>
        </div>
      </div>

      {/* Section 2: Accuracy Comparison Chart */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <h3 className="card-title">Model Accuracy Comparison (%)</h3>
        <div style={{ width: '100%', height: 200, marginTop: '12px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              layout="vertical" 
              data={accuracyComparisonData} 
              margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF1FF" horizontal={true} vertical={false} />
              <XAxis type="number" domain={[0, 100]} stroke="#8888AA" style={{ fontSize: 9 }} />
              <YAxis 
                dataKey="name" 
                type="category" 
                stroke="#8888AA" 
                style={{ fontSize: 9, fontFamily: 'var(--font-body)' }} 
                width={120} 
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="accuracy" name="Classification Accuracy" radius={[0, 4, 4, 0]} barSize={14}>
                {accuracyComparisonData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Section 3: Models Grid (2 columns) */}
      <div className="models-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {models.map((model, idx) => (
          <div key={idx} className="card model-card-styled" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '12px' }}>
            <div className="model-card-top">
              <div className="model-badge-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className={`pill ${model.badgeColor}`}>
                  {model.unit}
                </span>
                <span className="pill model-metric-pill" style={{ backgroundColor: 'rgba(177, 178, 255, 0.12)', color: 'var(--accent-primary)', fontWeight: 700 }}>
                  {model.metric}
                </span>
              </div>
              <h4 className="model-title" style={{ fontSize: '14.5px', fontWeight: 800, fontFamily: 'var(--font-headings)', marginTop: '12px', color: 'var(--text-primary)' }}>{model.name}</h4>
              <p className="model-desc" style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.4 }}>{model.desc}</p>
            </div>
            <div className="model-card-metric-row">
              <span className="model-card-metric-label">Key Training Feature</span>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>{model.feature}</span>
            </div>
            <div className="model-card-usecase">
              <strong>Application Use-case:</strong> {model.usecase}
            </div>
          </div>
        ))}
      </div>

      {/* Section 4: Flow Diagram */}
      <div className="card" style={{ marginTop: '20px' }}>
        <h3 className="card-title">How Models Work Together</h3>
        <div className="flow-diagram-container">
          <div className="flow-step-card">
            <span className="flow-step-icon">📊</span>
            <span className="flow-step-label">Data Preprocessing</span>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Fit StandardScaler</span>
          </div>
          
          <span className="flow-arrow-indicator">➔</span>
          
          <div className="flow-step-card">
            <span className="flow-step-icon">🤖</span>
            <span className="flow-step-label">Regression Core</span>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Linear Reg outputs G3</span>
          </div>

          <span className="flow-arrow-indicator">➔</span>

          <div className="flow-step-card">
            <span className="flow-step-icon">🎯</span>
            <span className="flow-step-label">Classification Ensemble</span>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Random Forest & SVM</span>
          </div>

          <span className="flow-arrow-indicator">➔</span>

          <div className="flow-step-card">
            <span className="flow-step-icon">🔮</span>
            <span className="flow-step-label">Cognitive Output</span>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Twin Match & Forecast</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Models
