import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './App.css'

// Error boundary for development
const root = ReactDOM.createRoot(document.getElementById('root'));

try {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
} catch (error) {
  console.error('Error rendering app:', error);
  root.render(
    <div style={{ 
      padding: '20px', 
      textAlign: 'center', 
      fontFamily: 'Arial, sans-serif',
      color: '#ef4444'
    }}>
      <h1>Something went wrong</h1>
      <p>Please refresh the page or contact support.</p>
      <pre>{error.message}</pre>
    </div>
  );
} 