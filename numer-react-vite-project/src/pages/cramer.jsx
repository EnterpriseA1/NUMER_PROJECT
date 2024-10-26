import React, { useState } from "react";
import NavbarComponent from "../component/Navbar";
import { MatrixInput, SizeInput, ResultsTable } from "../component/MatrixInput";

const CramerCalculator = () => {
    const [sizeInput, setSizeInput] = useState("3");
    const [size, setSize] = useState(3);
    const [matrix, setMatrix] = useState(Array(3).fill().map(() => Array(3).fill(0)));
    const [constants, setConstants] = useState(Array(3).fill(0));
    const [results, setResults] = useState([]);
    const [mainDet, setMainDet] = useState(null);

    // Calculate determinant for 2x2 matrix
    const det2x2 = (matrix) => {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    };

    // Get cofactor of matrix
    const getCofactor = (matrix, temp, p, q, n) => {
        let i = 0, j = 0;
        
        for (let row = 0; row < n; row++) {
            for (let col = 0; col < n; col++) {
                if (row !== p && col !== q) {
                    temp[i][j++] = matrix[row][col];
                    if (j === n - 1) {
                        j = 0;
                        i++;
                    }
                }
            }
        }
    };

    // Calculate determinant for any size matrix
    const calculateDeterminant = (matrix) => {
        const n = matrix.length;
        
        // Base case for 1x1 matrix
        if (n === 1) {
            return matrix[0][0];
        }
        
        // Base case for 2x2 matrix
        if (n === 2) {
            return det2x2(matrix);
        }
        
        let D = 0;
        let sign = 1;
        let temp = Array(n-1).fill().map(() => Array(n-1).fill(0));
        
        // Expand along first row
        for (let f = 0; f < n; f++) {
            getCofactor(matrix, temp, 0, f, n);
            D += sign * matrix[0][f] * calculateDeterminant(temp);
            sign = -sign;
        }
        
        return D;
    };

    const handleMatrixChange = (row, col, value) => {
        const newMatrix = matrix.map((r, rIndex) =>
            r.map((c, cIndex) => (rIndex === row && cIndex === col ? Number(value) : c))
        );
        setMatrix(newMatrix);
    };

    const handleConstantChange = (index, value) => {
        const newConstants = [...constants];
        newConstants[index] = Number(value);
        setConstants(newConstants);
    };

    const handleSizeInputChange = (event) => {
        const value = event.target.value;
        setSizeInput(value);

        const newSize = parseInt(value);
        if (!isNaN(newSize) && newSize > 0) {
            setSize(newSize);
            setMatrix(Array(newSize).fill().map(() => Array(newSize).fill(0)));
            setConstants(Array(newSize).fill(0));
            setResults([]);
            setMainDet(null);
        }
    };

    const calculateCramer = () => {
        try {
            // Calculate main determinant
            const detA = calculateDeterminant(matrix);
            setMainDet(detA);

            if (Math.abs(detA) < 1e-10) {
                alert("The system has no unique solution (determinant is too close to 0)");
                return;
            }

            const solutions = [];
            // Calculate solution for each variable
            for (let i = 0; i < size; i++) {
                // Create matrix for current variable
                const modifiedMatrix = matrix.map((row, rowIndex) =>
                    row.map((col, colIndex) => 
                        colIndex === i ? constants[rowIndex] : col
                    )
                );
                
                // Calculate determinant and solution
                const detModified = calculateDeterminant(modifiedMatrix);
                const solution = detModified / detA;
                
                solutions.push({
                    variable: `x${i + 1}`,
                    value: solution,
                    determinant: detModified
                });
            }
            
            setResults(solutions);
        } catch (error) {
            alert("Error in calculation. Please check your input values.");
        }
    };

    return (
        <>
            <NavbarComponent />
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-3xl font-bold text-center mb-6">Cramer's Rule Calculator</h2>

                    <SizeInput 
                        sizeInput={sizeInput} 
                        onSizeChange={handleSizeInputChange}
                        size={size}
                    />

                    {size > 0 && (
                        <>
                            <MatrixInput 
                                size={size}
                                matrix={matrix}
                                constants={constants}
                                onMatrixChange={handleMatrixChange}
                                onConstantChange={handleConstantChange}
                            />

                            <div className="flex justify-center mb-6">
                                <button
                                    onClick={calculateCramer}
                                    className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                    Calculate
                                </button>
                            </div>
                        </>
                    )}

                    {mainDet !== null && (
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-bold">Main Determinant: {mainDet.toFixed(6)}</h3>
                        </div>
                    )}

                    {results.length > 0 && <ResultsTable results={results} />}
                </div>
            </div>
        </>
    );
};

export default CramerCalculator;