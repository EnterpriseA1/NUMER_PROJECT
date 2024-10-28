import React from "react";

// Matrix Input Component
export const MatrixInput = ({ size, matrix, constants, onMatrixChange, onConstantChange }) => {
    return (
        <div className="flex flex-col items-center mb-6">
            <div className="overflow-x-auto max-w-full" style={{ maxHeight: '60vh' }}>
                <div className="grid gap-4" style={{ minWidth: 'fit-content' }}>
                    {matrix.map((row, i) => (
                        <div key={i} className="flex items-center gap-4">
                            {row.map((col, j) => (
                                <input
                                    key={j}
                                    type="number"
                                    value={col === 0 ? "0" : col || ""}
                                    onChange={(e) => onMatrixChange(i, j, e.target.value === "" ? 0 : e.target.value)}
                                    className="w-16 h-16 border rounded p-1 text-center text-lg"
                                />
                            ))}
                            <div className="text-gray-400 mx-2">x{i + 1}</div>
                            <div className="mx-2">=</div>
                            <input
                                type="number"
                                value={constants[i] === 0 ? "0" : constants[i] || ""}
                                onChange={(e) => onConstantChange(i, e.target.value === "" ? 0 : e.target.value)}
                                className="w-16 h-16 border rounded p-1 text-center text-lg"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Size Input Component
export const SizeInput = ({ sizeInput, onSizeChange, size }) => {
    return (
        <div className="flex flex-col items-center mb-8">
            <label className="text-xl mb-3">Enter Matrix's Dimension (n × n):</label>
            <input 
                type="text"
                value={sizeInput}
                onChange={onSizeChange}
                className="form-input border rounded p-3 w-64 text-center text-xl"
                placeholder="Enter size"
            />
            {parseInt(sizeInput) <= 0 && sizeInput !== "" && 
                <p className="text-sm text-red-500 mt-1">Size must be greater than 0</p>
            }
            {size > 20 && 
                <p className="text-sm text-yellow-500 mt-1">Large matrices may affect performance</p>
            }
        </div>
    );
};

// Results Table Component
export const ResultsTable = ({ results }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full table-auto text-center border-collapse border border-gray-800">
                <thead>
                    <tr className="bg-gray-800 text-white">
                        <th className="px-4 py-2 border border-gray-700">Variable</th>
                        <th className="px-4 py-2 border border-gray-700">Value</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
                            <td className="border px-4 py-2">{result.variable}</td>
                            <td className="border px-4 py-2">{result.value.toFixed(6)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};