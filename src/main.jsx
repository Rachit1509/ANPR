import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css'
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AllCarData from './pages/AllCarData.jsx'
import InputFile from './pages/InputFile.jsx'
import PastCarData from './pages/PastCarData.jsx'
import InvalidCarData from './pages/InvalidCarData.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>    
          <Route
            path="/"
            element={<AllCarData />}
          />
          <Route
            path="/past-car-data"
            element={<PastCarData />}
          />
          <Route
            path="/invalid-car-data"
            element={<InvalidCarData />}
          />  
        </Routes>
      </BrowserRouter>
  </React.StrictMode>,
)
