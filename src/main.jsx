import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css'
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import CurrentCarData from './pages/CurrentCarData.jsx'
import InputFile from './pages/InputFile.jsx'
import PastCarData from './pages/PastCarData.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>    
          <Route
            path="/"
            element={<CurrentCarData />}
          />
          <Route
            path="/past-car-data"
            element={<PastCarData />}
          />
          <Route
            path="/input-file"
            element={<InputFile />}
          />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>,
)
