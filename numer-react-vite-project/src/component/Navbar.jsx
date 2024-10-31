import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const NavbarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRootDropdownOpen, setIsRootDropdownOpen] = useState(false);
  const [isLinearDropdownOpen, setIsLinearDropdownOpen] = useState(false);
  const [isInterpolationDropdownOpen, setIsInterpolationDropdownOpen] = useState(false);
  const[isRegressionDropdownOpen, setIsRegressionDropdownOpen] = useState(false);
  const [isIntegrationDropdownOpen, setIsIntegrationDropdownOpen] = useState(false);

  const rootDropdownRef = useRef(null);
  const linearDropdownRef = useRef(null);
  const interpolationDropdownRef = useRef(null);
  const regressionDropdownRef = useRef(null);
  const integrationDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (rootDropdownRef.current && !rootDropdownRef.current.contains(event.target)) {
        setIsRootDropdownOpen(false);
      }
      if (linearDropdownRef.current && !linearDropdownRef.current.contains(event.target)) {
        setIsLinearDropdownOpen(false);
      }
      if (interpolationDropdownRef.current && !interpolationDropdownRef.current.contains(event.target)) {
        setIsInterpolationDropdownOpen(false);
      }
      if (integrationDropdownRef.current && !integrationDropdownRef.current.contains(event.target)) {
        setIsIntegrationDropdownOpen(false);
      }
      if (regressionDropdownRef.current && !regressionDropdownRef.current.contains(event.target)) {
        setIsRegressionDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleRootDropdown = (e) => {
    e.stopPropagation();
    setIsRootDropdownOpen(!isRootDropdownOpen);
    setIsLinearDropdownOpen(false);
    setIsInterpolationDropdownOpen(false);
    setIsIntegrationDropdownOpen(false);
  };

  const toggleLinearDropdown = (e) => {
    e.stopPropagation();
    setIsLinearDropdownOpen(!isLinearDropdownOpen);
    setIsRootDropdownOpen(false);
    setIsInterpolationDropdownOpen(false);
    setIsIntegrationDropdownOpen(false);
  };

  const toggleInterpolationDropdown = (e) => {
    e.stopPropagation();
    setIsInterpolationDropdownOpen(!isInterpolationDropdownOpen);
    setIsRootDropdownOpen(false);
    setIsLinearDropdownOpen(false);
    setIsIntegrationDropdownOpen(false);
  };

  const toggleIntegrationDropdown = (e) => {
    e.stopPropagation();
    setIsIntegrationDropdownOpen(!isIntegrationDropdownOpen);
    setIsRootDropdownOpen(false);
    setIsLinearDropdownOpen(false);
    setIsInterpolationDropdownOpen(false);
  };

  const toggleRegressionDropdown = (e) => {
    e.stopPropagation();
    setIsRegressionDropdownOpen(!isRegressionDropdownOpen);
    setIsRootDropdownOpen(false);
    setIsLinearDropdownOpen(false);
    setIsInterpolationDropdownOpen(false);
    setIsIntegrationDropdownOpen(false);
  }

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-white text-xl font-bold">
              Home
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Root of Equation Dropdown */}
            <div className="relative" ref={rootDropdownRef}>
              <button
                onClick={toggleRootDropdown}
                className="text-gray-300 hover:text-white inline-flex items-center"
              >
                <span>Root of Equation</span>
                <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${isRootDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isRootDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <a href="/Graphical" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                      Graphical Method
                    </a>
                    <a href="/Bisection" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                      Bisection Method
                    </a>
                    <a href="/False-Position" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                      False Position Method
                    </a>
                    <a href="/onepoint" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                      Onepoint Iteration Method
                    </a>
                    <a href="/Newton" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                      Newton Method
                    </a>
                    <a href="/Secant" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                      Secant Method
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Linear Algebra Dropdown */}
            <div className="relative" ref={linearDropdownRef}>
              <button
                onClick={toggleLinearDropdown}
                className="text-gray-300 hover:text-white inline-flex items-center"
              >
                <span>Linear Algebra</span>
                <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${isLinearDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLinearDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <a href="/Cramer" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                      Cramer's rule
                    </a>
                    <a href="/Gauss" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                      Gauss Elimination
                    </a>
                    <a href="/Gauss-Jordan" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                      Gauss-Jordan Elimination
                    </a>
                    <a href="/Matrix-Inversion" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                      Matrix Inversion
                    </a>
                    <a href="/LU" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                      LU Decomposition Method
                    </a>
                    <a href="/Cholesky" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                      Cholesky Decomposition
                    </a>
                    <a href="/Jacobi" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                      Jacobi Iteration Method
                    </a>
                    <a href="/Gauss-Seidel" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                      Gauss Seidel Method
                    </a>
                    <a href="/Conjugate-Gradient" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                      Conjugate Gradient Method
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Interpolation Dropdown */}
            <div className="relative" ref={interpolationDropdownRef}>
              <button
                onClick={toggleInterpolationDropdown}
                className="text-gray-300 hover:text-white inline-flex items-center"
              >
                <span>Interpolation</span>
                <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${isInterpolationDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isInterpolationDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <a href="/Newton-Divide" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                      Newton Divide-difference
                    </a>
                    <a href="/Lagrange" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                      Lagrange Interpolation
                    </a>
                    <a href="/Spline" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                      Spline Interpolation
                    </a>
                  </div>
                </div>
              )}
            </div>
            
            {/* Regression Dropdown */}
            <div className="relative" ref={regressionDropdownRef}>
              <button onClick={toggleRegressionDropdown} className="text-gray-300 hover:text-white inline-flex items-center">
                <span>Regression</span>
                <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${isRegressionDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isRegressionDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <a href="/Polynomial-Regression" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                      Polynomial Regression
                    </a>
                    <a href="/Multinomial-Regression" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                      Linear Regression
                    </a>
                  </div>
                </div> 
              )}
            </div>

            {/* Integration Dropdown */}
            <div className="relative" ref={integrationDropdownRef}>
              <button
                onClick={toggleIntegrationDropdown}
                className="text-gray-300 hover:text-white inline-flex items-center"
              >
                <span>Integration</span>
                <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${isIntegrationDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isIntegrationDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <a href="/Trapezoidal" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                      Trapezoidal Rule
                    </a>
                    <a href="/Simpson" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                      Simpson's Rule
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Login Button */}
            <div className="flex items-center ml-4">
              <a 
                href="/History" 
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                History
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>



        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Root of Equation Dropdown */}
              <div>
                <button
                  onClick={toggleRootDropdown}
                  className="flex justify-between items-center w-full px-3 py-2 text-gray-300 hover:text-white"
                >
                  <span>Root of Equation</span>
                  <ChevronDown className={`h-4 w-4 transform transition-transform duration-200 ${isRootDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isRootDropdownOpen && (
                  <div className="pl-4">
                    <a href="/Graphical" className="block px-3 py-2 text-gray-300 hover:text-white">
                      Graphical Method
                    </a>
                    <a href="/Bisection" className="block px-3 py-2 text-gray-300 hover:text-white">
                      Bisection Method
                    </a>
                    <a href="/False-Position" className="block px-3 py-2 text-gray-300 hover:text-white">
                      False Position Method
                    </a>
                    <a href="/onepoint" className="block px-3 py-2 text-gray-300 hover:text-white">
                      Onepoint Iteration Method
                    </a>
                    <a href="/Newton" className="block px-3 py-2 text-gray-300 hover:text-white">
                      Newton Method
                    </a>
                    <a href="/Secant" className="block px-3 py-2 text-gray-300 hover:text-white">
                      Secant Method
                    </a>
                  </div>
                )}
              </div>

              {/* Mobile Linear Algebra Dropdown */}
              <div>
                <button
                  onClick={toggleLinearDropdown}
                  className="flex justify-between items-center w-full px-3 py-2 text-gray-300 hover:text-white"
                >
                  <span>Linear Algebra</span>
                  <ChevronDown className={`h-4 w-4 transform transition-transform duration-200 ${isLinearDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isLinearDropdownOpen && (
                  <div className="pl-4">
                    <a href="/Cramer" className="block px-3 py-2 text-gray-300 hover:text-white">
                      Cramer's rule
                    </a>
                    <a href="/Gauss" className="block px-3 py-2 text-gray-300 hover:text-white">
                      Gauss Elimination
                    </a>
                    <a href="/Gauss-Jordan" className="block px-3 py-2 text-gray-300 hover:text-white">
                      Gauss-Jordan Elimination
                    </a>
                    <a href="/Matrix-Inversion" className="block px-3 py-2 text-gray-300 hover:text-white">
                      Matrix Inversion
                    </a>
                    <a href="/LU" className="block px-3 py-2 text-gray-300 hover:text-white">
                      LU Decomposition Method
                    </a>
                    <a href="/Cholesky" className="block px-3 py-2 text-gray-300 hover:text-white">
                      Cholesky Decomposition
                    </a>
                    <a href="/Jacobi" className="block px-3 py-2 text-gray-300 hover:text-white">
                      Jacobi Iteration Method
                    </a>
                    <a href="/Gauss-Seidel" className="block px-3 py-2 text-gray-300 hover:text-white">
                      Gauss Seidel Method
                    </a>
                    <a href="/Conjugate-Gradient" className="block px-3 py-2 text-gray-300 hover:text-white">
                      Conjugate Gradient Method
                    </a>
                  </div>
                )}
              </div>

              {/* Mobile Interpolation Dropdown */}
              <div>
                <button
                  onClick={toggleInterpolationDropdown}
                  className="flex justify-between items-center w-full px-3 py-2 text-gray-300 hover:text-white"
                >
                  <span>Interpolation</span>
                  <ChevronDown className={`h-4 w-4 transform transition-transform duration-200 ${isInterpolationDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isInterpolationDropdownOpen && (
                  <div className="pl-4">
                    <a href="/Newton-Divide" className="block px-3 py-2 text-gray-300 hover:text-white">
                      Newton Divide-difference
                    </a>
                    <a href="/Lagrange" className="block px-3 py-2 text-gray-300 hover:text-white">
                      Lagrange Interpolation
                    </a>
                    <a href="/Spline" className="block px-3 py-2 text-gray-300 hover:text-white">
                      Spline Interpolation
                    </a>
                  </div>
                )}
              </div>

              {/* Mobile Integration Dropdown */}
              <div>
                <button
                  onClick={toggleIntegrationDropdown}
                  className="flex justify-between items-center w-full px-3 py-2 text-gray-300 hover:text-white"
                >
                  <span>Integration</span>
                  <ChevronDown className={`h-4 w-4 transform transition-transform duration-200 ${isIntegrationDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isIntegrationDropdownOpen && (
                  <div className="pl-4">
                    <a href="/Trapezoidal" className="block px-3 py-2 text-gray-300 hover:text-white">
                      Trapezoidal Rule
                    </a>
                    <a href="/Simpson" className="block px-3 py-2 text-gray-300 hover:text-white">
                      Simpson's Rule
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarComponent;