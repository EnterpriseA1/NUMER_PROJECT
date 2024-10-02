import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
//import App from './pages/Bisection.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import HomePage from './pages/HOME.jsx'
import BisectionMethod from './pages/Bisection.jsx'
import GraphicalMethod from './pages/Graphical.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes> <Route path="/" element={<HomePage />}></Route> 
    <Route path="/Bisection" element={<BisectionMethod />}></Route>
    <Route path="/Graphical" element={<GraphicalMethod />}></Route>
    </Routes>
  </BrowserRouter>,
)
