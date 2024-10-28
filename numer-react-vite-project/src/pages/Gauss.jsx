import React, { useState } from "react";
import NavbarComponent from "../component/Navbar";
import { MatrixInput, SizeInput, ResultsTable } from "../component/MatrixInput";

const GaussCalculator = () => {
    const [sizeInput, setSizeInput] = useState("3");
    const [size, setSize] = useState(3);
    const [matrix, setMatrix] = useState(Array(3).fill(0).map(() => Array(3).fill(0)));
    const [constants, setConstants] = useState(Array(3).fill(0));
    const [results, setResults] = useState([]);
    const [steps, setSteps] = useState([]);

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
            setSteps([]);
        }
    };

    const gaussianElimination = () => {
        try {
            // Validate input values
            for(let i = 0; i < size; i++) {
                for(let j = 0; j < size; j++) {
                    if(isNaN(matrix[i][j])) {
                        throw new Error("Matrix contains invalid values");
                    }
                }
                if(isNaN(constants[i])) {
                    throw new Error("Constants vector contains invalid values");
                }
            }

            // Create augmented matrix
            const augMatrix = matrix.map((row, i) => [...row, constants[i]]);
            const n = size;
            const steps = [];

            // Forward elimination (following the provided logic)
            for (let i = 0; i < n; i++) {
                // Store current step
                steps.push(JSON.parse(JSON.stringify(augMatrix)));

                // Normalize the current row by the pivot
                const pivot = augMatrix[i][i];
                if (Math.abs(pivot) < 1e-10) {
                    throw new Error("Zero pivot encountered. System may have no unique solution.");
                }

                for (let k = 0; k <= n; k++) {
                    augMatrix[i][k] /= pivot;
                }

                // Eliminate the current column from all rows below
                for (let j = i + 1; j < n; j++) {
                    const factor = augMatrix[j][i];
                    for (let k = 0; k <= n; k++) {
                        augMatrix[j][k] -= factor * augMatrix[i][k];
                    }
                }
            }

            // Store final forward elimination step
            steps.push(JSON.parse(JSON.stringify(augMatrix)));

            // Back substitution (following the provided logic)
            const solution = new Array(n).fill(0);
            for (let i = n - 1; i >= 0; i--) {
                solution[i] = augMatrix[i][n];
                for (let j = i + 1; j < n; j++) {
                    solution[i] -= augMatrix[i][j] * solution[j];
                }
            }

            // Format results
            const solutions = solution.map((value, index) => ({
                variable: `x${index + 1}`,
                value: value,
            }));

            setResults(solutions);
            setSteps(steps);

        } catch (error) {
            alert(error.message || "Error in calculation. Please check your input values.");
            console.error("Calculation error:", error);
        }
    };

    return (
        <>
            <NavbarComponent />
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-3xl font-bold text-center mb-6">Gaussian Elimination Calculator</h2>

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
                                    onClick={gaussianElimination}
                                    className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                    Solve System
                                </button>
                            </div>
                        </>
                    )}

                    {steps.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-center mb-4">Elimination Steps</h3>
                            <div className="overflow-x-auto">
                                {steps.map((step, index) => (
                                    <div key={index} className="mb-4">
                                        <h4 className="font-semibold mb-2">Step {index + 1}</h4>
                                        <table className="min-w-full border-collapse">
                                            <tbody>
                                                {step.map((row, rowIndex) => (
                                                    <tr key={rowIndex}>
                                                        {row.map((value, colIndex) => (
                                                            <td key={colIndex} className="border px-4 py-2">
                                                                {value.toFixed(4)}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {results.length > 0 && <ResultsTable results={results} />}
                </div>
            </div>
        </>
    );
};

export default GaussCalculator;