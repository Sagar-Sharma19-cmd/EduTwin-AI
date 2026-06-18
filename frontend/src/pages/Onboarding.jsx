import { useState, useEffect } from 'react'

function Onboarding({ onComplete }) {
  const [step, setStep] = useState(1)
  const [userName, setUserName] = useState('Sagar Sharma')
  const [userAge, setUserAge] = useState('17')
  const [userSex, setUserSex] = useState('M')
  const [userAddress, setUserAddress] = useState('U')
  
  const [classSelection, setClassSelection] = useState('Class 11')
  const [higherEd, setHigherEd] = useState('yes')
  const [goal, setGoal] = useState('Conceptual Mastery')
  const [learningStyle, setLearningStyle] = useState('Visual')
  const [studyHours, setStudyHours] = useState('2-4 hours')
  
  const [strugglingSubjects, setStrugglingSubjects] = useState([])
  const [pastFailures, setPastFailures] = useState('0')
  const [extracurricular, setExtracurricular] = useState('no')
  
  // Calibration screen states
  const [logs, setLogs] = useState([])
  const [calibrating, setCalibrating] = useState(false)

  const handleGoalSelect = (selectedGoal) => setGoal(selectedGoal)
  const handleStyleSelect = (selectedStyle) => setLearningStyle(selectedStyle)
  const handleHoursSelect = (hours) => setStudyHours(hours)

  const handleSubjectToggle = (subject) => {
    if (strugglingSubjects.includes(subject)) {
      setStrugglingSubjects(prev => prev.filter(s => s !== subject))
    } else {
      setStrugglingSubjects(prev => [...prev, subject])
    }
  }

  const handleNextStep = () => {
    if (step < 4) {
      setStep(prev => prev + 1)
    } else {
      setCalibrating(true)
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(prev => prev - 1)
    }
  }

  useEffect(() => {
    if (!calibrating) return

    const logMessages = [
      { text: `⚡ Initializing digital twin neural layers for ${userName}...`, delay: 600, type: 'info' },
      { text: `👥 Constructing student cohort clusters for ${classSelection === 'Class 10' ? 'Class 10A' : classSelection === 'Class 11' ? 'Class 11B' : 'Class 12A'}...`, delay: 1300, type: 'info' },
      { text: `🌲 Calibrating Random Forest regression weights (${userAddress === 'U' ? 'Urban' : 'Rural'} setting)...`, delay: 2000, type: 'info' },
      { text: `🧠 Solving ${learningStyle} cognitive forgetting coefficients...`, delay: 2800, type: 'info' },
      { text: `✅ Digital Twin simulation calibrated successfully! Welcome, ${userName}!`, delay: 3500, type: 'success' }
    ]

    logMessages.forEach((item) => {
      setTimeout(() => {
        setLogs(prev => [...prev, item])
      }, item.delay)
    })

    setTimeout(() => {
      // Save all profile setup parameters to local storage
      localStorage.setItem('userName', userName)
      localStorage.setItem('userAge', userAge)
      localStorage.setItem('userSex', userSex)
      localStorage.setItem('userAddress', userAddress)
      localStorage.setItem('userClass', classSelection === 'Class 10' ? 'Class 10A' : classSelection === 'Class 11' ? 'Class 11B' : 'Class 12A')
      localStorage.setItem('userGoal', goal)
      localStorage.setItem('userLearningStyle', learningStyle)
      localStorage.setItem('userStudyHours', studyHours)
      localStorage.setItem('userFailures', pastFailures)
      localStorage.setItem('userActivities', extracurricular)
      localStorage.setItem('userHigher', higherEd)
      localStorage.setItem('isOnboarded', 'true')
      
      onComplete()
    }, 4500)

  }, [calibrating, onComplete])

  return (
    <div className="onboarding-page" id="onboarding-page">
      {/* Ambient decorative glowing orbs */}
      <div className="login-bg-glow login-bg-glow-1"></div>
      <div className="login-bg-glow login-bg-glow-2"></div>

      <div className="login-premium-card onboarding-premium-card">
        
        {/* Steps Progress Header */}
        {!calibrating && (
          <div className="onboarding-steps-header">
            <div className="onboarding-steps-indicators">
              <span className="onboarding-step-indicator-text">Step {step} of 4</span>
            </div>
            <div className="onboarding-progress-bar">
              <div 
                className="onboarding-progress-fill" 
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
            <div className="onboarding-title-sub" style={{ marginTop: '12px' }}>
              <h2>
                {step === 1 && 'Personal Profile'}
                {step === 2 && 'Academic Foundation'}
                {step === 3 && 'Cognitive Calibration'}
                {step === 4 && 'Risk & Diagnosis'}
              </h2>
              <span className="count-label">
                {step === 1 && '1/4'}
                {step === 2 && '2/4'}
                {step === 3 && '3/4'}
                {step === 4 && '4/4'}
              </span>
            </div>
            <p style={{ fontSize: '13px', color: '#9A9AB5', marginTop: '6px', lineHeight: 1.5 }}>
              {step === 1 && 'Provide your student demographics to calibrate the neural clustering algorithms.'}
              {step === 2 && 'Configure your cohort classifications, grade level, and simulation targets.'}
              {step === 3 && 'Define your core learning preference modalities and baseline study allocations.'}
              {step === 4 && 'Diagnose weak areas and potential academic risk indicators.'}
            </p>
          </div>
        )}

        {/* STEP 1: Personal Profile */}
        {!calibrating && step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
            <div className="form-group-custom">
              <label htmlFor="onboard-name">Student Full Name</label>
              <div className="input-icon-wrapper">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <input 
                  type="text" 
                  id="onboard-name" 
                  className="login-dark-input" 
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>

            <div className="form-group-custom">
              <label htmlFor="onboard-age">Age</label>
              <div className="input-icon-wrapper">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <input 
                  type="number" 
                  id="onboard-age" 
                  className="login-dark-input" 
                  value={userAge}
                  onChange={(e) => setUserAge(e.target.value)}
                  min="15"
                  max="22"
                  required
                />
              </div>
            </div>

            <div className="form-group-custom">
              <label htmlFor="onboard-sex">Gender (Sex)</label>
              <div className="input-icon-wrapper">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="2" x2="12" y2="22"></line>
                  <line x1="17" y1="5" x2="7" y2="5"></line>
                </svg>
                <select 
                  id="onboard-sex"
                  className="login-dark-input" 
                  value={userSex}
                  onChange={(e) => setUserSex(e.target.value)}
                  style={{ cursor: 'pointer', paddingRight: '16px' }}
                >
                  <option value="M">Male (M)</option>
                  <option value="F">Female (F)</option>
                </select>
              </div>
            </div>

            <div className="form-group-custom">
              <label htmlFor="onboard-address">Address Setting</label>
              <div className="input-icon-wrapper">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <select 
                  id="onboard-address"
                  className="login-dark-input" 
                  value={userAddress}
                  onChange={(e) => setUserAddress(e.target.value)}
                  style={{ cursor: 'pointer', paddingRight: '16px' }}
                >
                  <option value="U">Urban (U)</option>
                  <option value="R">Rural (R)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Academic Setup */}
        {!calibrating && step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
            <div className="form-group-custom">
              <label htmlFor="onboard-class">Grade Level</label>
              <div className="input-icon-wrapper">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
                <select 
                  id="onboard-class"
                  className="login-dark-input" 
                  value={classSelection}
                  onChange={(e) => setClassSelection(e.target.value)}
                  style={{ cursor: 'pointer', paddingRight: '16px' }}
                >
                  <option value="Class 10">Class 10 (Secondary Core)</option>
                  <option value="Class 11">Class 11 (Intermediate Core)</option>
                  <option value="Class 12">Class 12 (Board Mock Calibration)</option>
                </select>
              </div>
            </div>

            <div className="form-group-custom">
              <label htmlFor="onboard-higher">Wants Higher Education Goal</label>
              <div className="input-icon-wrapper">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
                <select 
                  id="onboard-higher"
                  className="login-dark-input" 
                  value={higherEd}
                  onChange={(e) => setHigherEd(e.target.value)}
                  style={{ cursor: 'pointer', paddingRight: '16px' }}
                >
                  <option value="yes">Yes (Calibrate higher goal thresholds)</option>
                  <option value="no">No (Local vocation pathways)</option>
                </select>
              </div>
            </div>

            <div className="form-group-custom">
              <label style={{ marginBottom: '4px' }}>Simulation Objective</label>
              <div className="onboarding-choices-grid">
                <div 
                  className={`choice-selection-card ${goal === 'Conceptual Mastery' ? 'selected' : ''}`}
                  onClick={() => handleGoalSelect('Conceptual Mastery')}
                >
                  <span className="choice-title">Conceptual Mastery</span>
                  <span className="choice-desc">Examine theoretical gaps and construct baseline subjects.</span>
                  <div className="choice-checkmark">✓</div>
                </div>

                <div 
                  className={`choice-selection-card ${goal === 'Exam Prep' ? 'selected' : ''}`}
                  onClick={() => handleGoalSelect('Exam Prep')}
                >
                  <span className="choice-title">Exam Optimization</span>
                  <span className="choice-desc">Configure mock scores, grade weights, and exam prep models.</span>
                  <div className="choice-checkmark">✓</div>
                </div>

                <div 
                  className={`choice-selection-card ${goal === 'Study Routine' ? 'selected' : ''}`}
                  onClick={() => handleGoalSelect('Study Routine')}
                >
                  <span className="choice-title">Habit Formation</span>
                  <span className="choice-desc">Establish study discipline, time-blocks, and focus routines.</span>
                  <div className="choice-checkmark">✓</div>
                </div>

                <div 
                  className={`choice-selection-card ${goal === 'Gap Isolation' ? 'selected' : ''}`}
                  onClick={() => handleGoalSelect('Gap Isolation')}
                >
                  <span className="choice-title">Cognitive Calibration</span>
                  <span className="choice-desc">Tune self-estimate discrepancies and warning indicators.</span>
                  <div className="choice-checkmark">✓</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Cognitive Preferences */}
        {!calibrating && step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
            <div className="form-group-custom">
              <label style={{ marginBottom: '4px' }}>Cognitive Modality</label>
              <div className="onboarding-choices-grid">
                <div 
                  className={`choice-selection-card ${learningStyle === 'Visual' ? 'selected' : ''}`}
                  onClick={() => handleStyleSelect('Visual')}
                >
                  <span className="choice-title">Visual-Spatial</span>
                  <span className="choice-desc">Understand details via mapping schemas and diagrams.</span>
                  <div className="choice-checkmark">✓</div>
                </div>

                <div 
                  className={`choice-selection-card ${learningStyle === 'Auditory' ? 'selected' : ''}`}
                  onClick={() => handleStyleSelect('Auditory')}
                >
                  <span className="choice-title">Acoustic-Auditory</span>
                  <span className="choice-desc">Digest information via dialogue, lectures, and speech recalls.</span>
                  <div className="choice-checkmark">✓</div>
                </div>

                <div 
                  className={`choice-selection-card ${learningStyle === 'Reading' ? 'selected' : ''}`}
                  onClick={() => handleStyleSelect('Reading')}
                >
                  <span className="choice-title">Read-Write Synthesis</span>
                  <span className="choice-desc">Process key textbooks, summary notes, and literature texts.</span>
                  <div className="choice-checkmark">✓</div>
                </div>

                <div 
                  className={`choice-selection-card ${learningStyle === 'Mixed' ? 'selected' : ''}`}
                  onClick={() => handleStyleSelect('Mixed')}
                >
                  <span className="choice-title">Multimodal Integration</span>
                  <span className="choice-desc">Blend active recall cards, video walkthroughs, and formulas.</span>
                  <div className="choice-checkmark">✓</div>
                </div>
              </div>
            </div>

            <div className="form-group-custom">
              <label style={{ marginBottom: '6px' }}>Daily Study Allocation Baseline</label>
              <div className="baseline-hours-grid">
                {['1-2 hrs', '2-4 hrs', '4-6 hrs', '6+ hrs'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleHoursSelect(item)}
                    className={`baseline-hour-btn ${studyHours === item ? 'selected' : ''}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Risk & Diagnosis */}
        {!calibrating && step === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
            
            <div className="form-group-custom">
              <label htmlFor="onboard-failures">Past Class Failures</label>
              <div className="input-icon-wrapper">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                <select 
                  id="onboard-failures"
                  className="login-dark-input" 
                  value={pastFailures}
                  onChange={(e) => setPastFailures(e.target.value)}
                  style={{ cursor: 'pointer', paddingRight: '16px' }}
                >
                  <option value="0">0 failures (Standard calibration)</option>
                  <option value="1">1 failures (Moderate baseline shift)</option>
                  <option value="2">2 failures (Significant risk warning)</option>
                  <option value="3">3+ failures (Intervention priority alert)</option>
                </select>
              </div>
            </div>

            <div className="form-group-custom">
              <label htmlFor="onboard-activities">Extracurricular Active Habits</label>
              <div className="input-icon-wrapper">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
                <select 
                  id="onboard-activities"
                  className="login-dark-input" 
                  value={extracurricular}
                  onChange={(e) => setExtracurricular(e.target.value)}
                  style={{ cursor: 'pointer', paddingRight: '16px' }}
                >
                  <option value="yes">Yes (Active sports, clubs, or arts)</option>
                  <option value="no">No (Focused exclusively on core studies)</option>
                </select>
              </div>
            </div>

            <div className="form-group-custom" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <label style={{ marginBottom: '6px' }}>Specify Struggling Syllabus Areas</label>
              <div className="subject-tags-container">
                {[
                  { name: 'Mathematics 📐', val: 'Maths' },
                  { name: 'Organic Chemistry 🧪', val: 'Chemistry' },
                  { name: 'Quantum Physics ⚡', val: 'Physics' },
                  { name: 'English Literature 📚', val: 'English' }
                ].map((sub) => (
                  <div
                    key={sub.val}
                    className={`subject-tag-card ${strugglingSubjects.includes(sub.val) ? 'selected' : ''}`}
                    onClick={() => handleSubjectToggle(sub.val)}
                  >
                    <span>{strugglingSubjects.includes(sub.val) ? '✓' : '+'}</span>
                    <span>{sub.name}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '11px', color: '#6C6C8A', textAlign: 'center', margin: 0 }}>
                *Discrepancies calibrate cognitive decay and warnings indicators.
              </p>
            </div>
          </div>
        )}

        {/* FOOTER ACTIONS */}
        {!calibrating && (
          <div className="onboarding-nav-row">
            <button 
              type="button" 
              className="btn-onboarding-secondary" 
              onClick={handlePrevStep}
              style={{ visibility: step === 1 ? 'hidden' : 'visible' }}
            >
              Back
            </button>
            
            <button 
              type="button" 
              className="btn-onboarding-primary" 
              onClick={handleNextStep}
            >
              {step === 4 ? (
                <>
                  <span>🤖</span> Calibrate Twin
                </>
              ) : (
                'Next Step'
              )}
            </button>
          </div>
        )}

        {/* CALIBRATION PROCESS SCREEN */}
        {calibrating && (
          <div className="calibration-container">
            <div className="calibration-pulse-avatar">
              <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#FFFFFF', margin: 0 }}>
              Calibrating Digital Twin
            </h3>
            
            <p style={{ fontSize: '13px', color: '#9A9AB5' }}>
              Mapping parameters: <strong style={{ color: '#7B7DFF' }}>{classSelection}</strong> · <strong style={{ color: '#7B7DFF' }}>{learningStyle}</strong> style
            </p>

            <div className="calibration-logs">
              {logs.map((log, index) => (
                <div 
                  key={index} 
                  className={`log-item-line ${log.type === 'success' ? 'log-success' : ''}`}
                >
                  {log.text}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Onboarding
