import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Console Credits
console.log(
  '%c🚀 Portfolio by Andhika Presha Saputra',
  'background: linear-gradient(90deg, #8B5CF6, #6366F1); color: white; font-size: 20px; font-weight: bold; padding: 12px 24px; border-radius: 8px;'
);
console.log(
  '%c© 2024-2026 Andhika Presha Saputra. All Rights Reserved.',
  'color: #A78BFA; font-size: 12px; font-weight: 600;'
);
console.log(
  '%c📧 andhika0143@gmail.com | 🌐 github.com/Dhikaaapr',
  'color: #9CA3AF; font-size: 11px;'
);
console.log(
  '%c⚡ Built with React + Vite + TailwindCSS',
  'color: #10B981; font-size: 11px; font-style: italic;'
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

