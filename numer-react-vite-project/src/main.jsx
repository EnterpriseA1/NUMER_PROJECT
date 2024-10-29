import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import BisectionMethod from './pages/Bisection.jsx'
import GraphicalMethod from './pages/Graphical.jsx'
import FalsePositionMethod from './pages/False-position.jsx'
import NewtonRaphsonMethod from './pages/Newton.jsx'
import OnePointIterationMethod from './pages/onepoint.jsx'
import SecantMethod from './pages/secant.jsx'
import CramerCalculator from './pages/cramer.jsx'
import GaussCalculator from './pages/Gauss.jsx'
import GaussJordanCalculator from './pages/Gauss-Jordan.jsx'
import NewtonDividedDifference from './pages/Newton-Divide.jsx'
import LagrangeInterpolation from './pages/Lagrange.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<BisectionMethod />}></Route>
    <Route path="/Bisection" element={<BisectionMethod />}></Route>
    <Route path="/Graphical" element={<GraphicalMethod />}></Route>
    <Route path="/False-Position" element={<FalsePositionMethod />}></Route>
    <Route path="/Newton" element={<NewtonRaphsonMethod />}></Route>
    <Route path="/onepoint" element={<OnePointIterationMethod />}></Route>
    <Route path="/secant" element={<SecantMethod />}></Route>
    <Route path="/cramer" element={<CramerCalculator />}></Route>
    <Route path="/Gauss" element={<GaussCalculator />}></Route>
    <Route path="/Gauss-Jordan" element={<GaussJordanCalculator />}></Route>
    <Route path="/Newton-Divide" element={<NewtonDividedDifference />}></Route>
    <Route path="/Lagrange" element={<LagrangeInterpolation />}></Route>
    </Routes>
  </BrowserRouter>,
)
