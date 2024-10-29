import React, { useState } from "react";
import NavbarComponent from "../component/Navbar";

const LagrangeInterpolation = () => {
    const [points, setPoints] = useState([
        { x: 0, y: 1 },
        { x: 1, y: 2 },
        { x: 2, y: 4 }
    ]);
    const [xValue, setXValue] = useState(1.5);
    const [result, setResult] = useState(0);
    const [terms, setTerms] = useState([]);
    const [equation, setEquation] = useState("");

    // Calculate Lagrange basis polynomial Li(x)
    const calculateBasisTerm = (i, x, points) => {
        let numerator = 1;
        let denominator = 1;
        
        for (let j = 0; j < points.length; j++) {
            if (j !== i) {
                numerator *= (x - points[j].x);
                denominator *= (points[i].x - points[j].x);
            }
        }
        
        return numerator / denominator;
    };

    // Build Lagrange basis polynomial string for display
    const buildBasisTermString = (i, points) => {
        let numerator = [];
        let denominator = [];
        
        for (let j = 0; j < points.length; j++) {
            if (j !== i) {
                numerator.push(`(x - ${points[j].x})`);
                denominator.push(`(${points[i].x} - ${points[j].x})`);
            }
        }
        
        return {
            term: `(${numerator.join(" × ")}) / (${denominator.join(" × ")})`,
            value: points[i].y
        };
    };

    const calculateLagrange = () => {
        try {
            const n = points.length;
            let result = 0;
            const newTerms = [];
            let polynomial = "";

            // Calculate interpolation and build polynomial string
            for (let i = 0; i < n; i++) {
                const basis = calculateBasisTerm(i, xValue, points);
                const term = points[i].y * basis;
                result += term;

                const basisString = buildBasisTermString(i, points);
                newTerms.push({
                    index: i,
                    point: `(${points[i].x}, ${points[i].y})`,
                    basisTerm: basisString.term,
                    coefficient: points[i].y,
                    value: term
                });

                // Build polynomial string
                if (i > 0) polynomial += " + ";
                polynomial += `${points[i].y} × ${basisString.term}`;
            }

            setResult(result);
            setTerms(newTerms);
            setEquation(polynomial);

        } catch (err) {
            console.error(err);
            setResult(0);
            setTerms([]);
            setEquation("");
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
                        <h2 className="text-3xl font-bold mb-4">Lagrange Interpolation Calculator</h2>
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
                            onClick={calculateLagrange}
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
                                <th className="px-4 py-2 border border-gray-700">i</th>
                                <th className="px-4 py-2 border border-gray-700">Point (xi, yi)</th>
                                <th className="px-4 py-2 border border-gray-700">Li(x)</th>
                                <th className="px-4 py-2 border border-gray-700">yi × Li(x)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {terms.map((term, index) => (
                                <tr key={index} className={`bg-gray-100 hover:bg-gray-200 ${index % 2 === 0 ? "bg-gray-50" : ""}`}>
                                    <td className="border px-4 py-2">{term.index}</td>
                                    <td className="border px-4 py-2">{term.point}</td>
                                    <td className="border px-4 py-2">{term.basisTerm}</td>
                                    <td className="border px-4 py-2">{term.value.toPrecision(7)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default LagrangeInterpolation;