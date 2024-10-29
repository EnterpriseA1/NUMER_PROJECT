import React, { useState } from "react";
import NavbarComponent from "../component/Navbar";

const NewtonDividedDifference = () => {
    const [points, setPoints] = useState([
        { x: 0, y: 1 },
        { x: 1, y: 2 },
        { x: 2, y: 4 }
    ]);
    const [xValue, setXValue] = useState(1.5);
    const [result, setResult] = useState(0);
    const [iterations, setIterations] = useState([]);
    const [equation, setEquation] = useState("");

    // Recursive function to calculate divided differences
    const dividedDifference = (points, i, j) => {
        if (i === j) {
            return points[i].y;
        }
        
        if (j - i === 1) {
            return (points[j].y - points[i].y) / (points[j].x - points[i].x);
        }
        
        return (
            (dividedDifference(points, i + 1, j) - dividedDifference(points, i, j - 1)) /
            (points[j].x - points[i].x)
        );
    };

    const calculateNewtonDividedDifference = () => {
        try {
            const n = points.length;
            const newIterations = [];
            const coeffs = new Array(n);
            let polynomial = `${points[0].y}`;

            // Calculate divided differences and build polynomial
            for (let j = 1; j < n; j++) {
                const diff = dividedDifference(points, 0, j);
                coeffs[j] = diff;
                
                // Build term (x - x₀)(x - x₁)...(x - xₙ₋₁)
                let term = diff.toPrecision(7);
                for (let k = 0; k < j; k++) {
                    term += `(x - ${points[k].x})`;
                }
                polynomial += ` + ${term}`;

                newIterations.push({
                    order: j,
                    coefficients: diff,
                    points: points.slice(0, j + 1).map(p => `(${p.x}, ${p.y})`).join(", "),
                    dividedDiff: diff
                });
            }

            setEquation(polynomial);
            setIterations(newIterations);

            // Calculate interpolation at xValue
            let result = points[0].y;
            let term = 1;
            for (let i = 1; i < n; i++) {
                term *= (xValue - points[i - 1].x);
                result += coeffs[i] * term;
            }
            setResult(result);

        } catch (err) {
            console.error(err);
            setResult(0);
            setIterations([]);
        }
    };

    const handleAddPoint = () => {
        setPoints([...points, { x: 0, y: 0 }]);
    };

    const handleRemovePoint = (index) => {
        if (points.length > 2) {
            setPoints(points.filter((_, i) => i !== index));
        }
    };

    const handlePointChange = (index, field, value) => {
        const newPoints = [...points];
        newPoints[index][field] = parseFloat(value);
        setPoints(newPoints);
    };

    return (
        <>
            <NavbarComponent />
            <div className="flex flex-col justify-center items-center border rounded p-4 mt-5 min-h-screen">
                <div className="flex flex-col justify-center items-center border rounded p-4">
                    <div className="flex flex-col items-center">
                        <h2 className="text-3xl font-bold mb-4">Newton's Divided Difference Calculator</h2>
                    </div>

                    <form className="flex flex-col items-center space-y-4">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold">Data Points</h3>
                            {points.map((point, index) => (
                                <div key={index} className="flex space-x-2">
                                    <input
                                        type="number"
                                        value={point.x}
                                        onChange={(e) => handlePointChange(index, 'x', e.target.value)}
                                        placeholder="x"
                                        className="form-input mt-1 block border rounded p-2"
                                        step="any"
                                    />
                                    <input
                                        type="number"
                                        value={point.y}
                                        onChange={(e) => handlePointChange(index, 'y', e.target.value)}
                                        placeholder="y"
                                        className="form-input mt-1 block border rounded p-2"
                                        step="any"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemovePoint(index)}
                                        className="bg-gray-800 text-white px-4 py-2 rounded"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={handleAddPoint}
                                className="bg-gray-800 text-white px-4 py-2 rounded w-full"
                            >
                                Add Point
                            </button>
                        </div>

                        <label className="block">
                            <span className="text-lg">Interpolation Point (x)</span>
                            <input
                                type="number"
                                value={xValue}
                                onChange={(e) => setXValue(parseFloat(e.target.value))}
                                className="form-input mt-1 block w-full border rounded p-2"
                                step="any"
                            />
                        </label>

                        <button
                            type="button"
                            onClick={calculateNewtonDividedDifference}
                            className="bg-gray-800 text-white px-4 py-2 rounded w-full"
                        >
                            Calculate
                        </button>
                    </form>
                    <br />
                    {equation && (
                        <div className="mb-2 font-bold text-2xl">
                            Interpolation Polynomial: P(x) = {equation}
                        </div>
                    )}

                    <div>
                        <h5 className="font-bold text-xl">Interpolated Value = {result.toPrecision(7)}</h5>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center mt-4 w-full overflow-x-auto">
                    <table className="min-w-full table-auto text-center border-collapse border border-gray-800">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="px-4 py-2 border border-gray-700">Order</th>
                                <th className="px-4 py-2 border border-gray-700">Points Used</th>
                                <th className="px-4 py-2 border border-gray-700">Divided Difference</th>
                            </tr>
                        </thead>
                        <tbody>
                            {iterations.map((element, index) => (
                                <tr key={index} className={`bg-gray-100 hover:bg-gray-200 ${index % 2 === 0 ? "bg-gray-50" : ""}`}>
                                    <td className="border px-4 py-2">{element.order}</td>
                                    <td className="border px-4 py-2">{element.points}</td>
                                    <td className="border px-4 py-2">{element.dividedDiff.toPrecision(7)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default NewtonDividedDifference;