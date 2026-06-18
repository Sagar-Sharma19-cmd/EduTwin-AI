# EduTwin Frontend

Modern React frontend for the EduTwin AI Student Twin application.

## 📁 Project Structure

```
frontend/
├── src/
│   ├── main.jsx              ← Entry point
│   ├── App.jsx               ← Main routing component
│   ├── App.css               ← Global styles with CSS variables
│   │
│   ├── components/
│   │   ├── Sidebar.jsx       ← Left navigation sidebar
│   │   ├── Sidebar.css
│   │   ├── Topbar.jsx        ← Top header bar
│   │   └── Topbar.css
│   │
│   └── pages/
│       ├── Dashboard.jsx     ← Main dashboard view
│       ├── Dashboard.css
│       ├── MyTwin.jsx        ← Digital twin profile
│       ├── MyTwin.css
│       ├── Forecast.jsx      ← 7-day struggle forecast
│       ├── Forecast.css
│       ├── Predictor.jsx     ← ML prediction form (calls backend)
│       └── Predictor.css
│
├── index.html                ← HTML entry point
├── package.json              ← Dependencies
├── vite.config.js            ← Vite configuration
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

### Build

```bash
npm run build
```

## 📦 Dependencies

- **React 18** - UI library
- **React Router DOM 7** - Client-side routing
- **Vite 5** - Build tool and dev server

## 🎨 Design System

### Color Palette
- **Primary**: `#667eea` (Purple)
- **Secondary**: `#764ba2` (Dark Purple)
- **Success**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Amber)
- **Danger**: `#ef4444` (Red)

### CSS Variables
All colors are defined as CSS variables in `App.css` for easy theming.

## 🔌 Backend Integration

The **Predictor** page makes API calls to the backend:

```javascript
POST http://localhost:8000/api/predict
```

Request body:
```json
{
  "gpa": 3.85,
  "attendance": 92,
  "study_hours": 20,
  "assignments_completed": 18
}
```

Expected response:
```json
{
  "prediction": "Pass",
  "probability": 0.85,
  "recommendations": ["Keep up attendance", "Review weak topics"]
}
```

## 📱 Responsive Design

The app is fully responsive:
- **Desktop** (1024px+): Full layout with sidebar
- **Tablet** (768px - 1023px): Adaptive layout
- **Mobile** (<768px): Horizontal sidebar, single column content

## 🎯 Pages Overview

| Page | Purpose |
|------|---------|
| **Dashboard** | Overview of student metrics and stats |
| **My Twin** | Digital twin profile and analysis |
| **Forecast** | 7-day struggle prediction with confidence |
| **Predictor** | ML-powered pass/fail prediction |

## 🔗 Navigation

- `/` → Dashboard
- `/dashboard` → Dashboard
- `/mytwin` → My Twin Profile
- `/forecast` → 7-Day Forecast
- `/predictor` → ML Predictor

## 📝 Notes

- The sidebar automatically highlights the active route
- Form inputs have validation on the Predictor page
- All API calls include error handling with user-friendly messages
- Uses Vite for fast HMR (Hot Module Replacement) during development

## 🛠️ Customization

To modify colors, update the CSS variables in `App.css`:

```css
:root {
  --primary: #667eea;
  --secondary: #764ba2;
  /* ... other variables ... */
}
```

All components automatically use these variables.
