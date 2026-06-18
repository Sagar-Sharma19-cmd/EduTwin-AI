import { useState } from 'react'

function Login({ onLogin }) {
  const [email, setEmail] = useState('sagar.sharma@edutwin.ai')
  const [password, setPassword] = useState('password123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [agree, setAgree] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!agree) {
      setError('You must agree to the Terms.')
      setLoading(false)
      return
    }

    setTimeout(() => {
      if (!email || !password) {
        setError('Please fill in all fields.')
        setLoading(false)
      } else {
        setLoading(false)
        onLogin()
      }
    }, 1000)
  }

  return (
    <div className="login-page-wrapper" id="login-page">
      {/* Ambient decorative glowing orbs */}
      <div className="login-bg-glow login-bg-glow-1"></div>
      <div className="login-bg-glow login-bg-glow-2"></div>

      <div className="login-premium-card">
        {/* Brand Logo */}
        <div className="login-logo">
          <span>EDU</span>TWIN
        </div>

        {/* Header */}
        <div className="login-form-header">
          <h2>Welcome back</h2>
          <p>Enter your credentials to access your student digital twin</p>
        </div>

        {error && (
          <div 
            className="predictor-error-box" 
            style={{ 
              marginTop: 0, 
              marginBottom: '20px', 
              padding: '12px 16px', 
              borderRadius: '10px', 
              background: 'rgba(239, 68, 68, 0.1)', 
              border: '1px solid rgba(239, 68, 68, 0.2)', 
              color: '#EF4444', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              fontSize: '13px' 
            }}
          >
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Email input field */}
          <div className="form-group-custom">
            <label htmlFor="email">Email Address</label>
            <div className="input-icon-wrapper">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <input
                type="email"
                id="email"
                className="login-dark-input"
                placeholder="name@edutwin.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password input field */}
          <div className="form-group-custom">
            <label htmlFor="password">Password</label>
            <div className="input-icon-wrapper">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <input
                type="password"
                id="password"
                className="login-dark-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Remember/Terms & Forgot Password */}
          <div className="login-extra-row">
            <label className="login-remember-me">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <span>Keep me logged in</span>
            </label>
            <a href="#forgot" className="forgot-password-link" onClick={(e) => { e.preventDefault(); alert('Reset password link sent to your email.'); }}>
              Forgot password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="btn-signin-premium"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="mini-spinner"></span>
                <span>Signing in...</span>
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="login-divider-row">or continue with</div>

        {/* Social Logins */}
        <div className="social-dark-grid">
          <button type="button" className="social-dark-btn" onClick={() => onLogin()}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.99 5.99 0 018 12.5a5.99 5.99 0 015.99-6.023c1.55 0 2.977.586 4.074 1.552l3.226-3.226A9.972 9.972 0 0013.99 2 9.99 9.99 0 004 12c0 5.52 4.47 10 9.99 10 5.76 0 9.98-4.045 9.98-10 0-.682-.07-1.32-.2-1.715h-11.53z"/>
            </svg>
            Google
          </button>
          <button type="button" className="social-dark-btn" onClick={() => onLogin()}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2.67-2.92 1.52-.64.73-1.2 1.87-1.05 2.97 1.1.09 2.22-.51 2.98-1.43"/>
            </svg>
            Apple
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
