import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
// ✅ Global styles
import "./styles/theme.css";
import "./styles/auth.css";

// ✅ Bootstrap import (THIS IS THE RIGHT PLACE)
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById('root')).render(
    <App />
)
