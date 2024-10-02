import '../App.css';
import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import Plot from 'react-plotly.js';
import MathEquation from '../component/MathEquation';
import NavbarComponent from '../component/Navbar';

const GraphicalMethod = () => {
    const [equation, setEquation] = useState("(x^4)-13");
    const [xs, setXs] = useState(0);
    const [xe, setXe] = useState(0);
    const [root, setRoot] = useState(null);
    const [iterations, setIterations] = useState([]);

    const calculateGraphical = (xs, xe) => {
        let xStart = parseFloat(xs);
        let xEnd = parseFloat(xe);
        let fxnum = evaluate(equation, { x: xStart });
        let newData = [];

        while (xStart < xEnd && fxnum <= 0) {
            xStart++;
            fxnum = evaluate(equation, { x: xStart });
        }

        if (fxnum > 0) {
            let tole = [1e-1, 1e-2, 1e-3, 1e-4, 1e-5, 1e-6, 1e-7];
            let count = 0;
            let ztemp = xStart;
            let iter = 0;

            while (count < tole.length && ztemp < xEnd) {
                let fxCurrent = evaluate(equation, { x: ztemp });

                if (fxCurrent > 0) {
                    ztemp -= tole[count];
                    count++;
                } else {
                    newData.push({ iteration: iter, xValue: ztemp, fX: fxCurrent });
                    iter++;
                    ztemp += tole[count];
                }
            }

            setIterations(newData);
            setRoot(ztemp);
        } else {
            alert('No valid roots found in the given range.');
        }
    };

    return (
        <>
            <NavbarComponent />
            <div className="flex flex-col items-center p-8 mt-5 min-h-screen bg-gray-100">
                <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg w-full max-w-3xl">
                    <h2 className="text-3xl font-bold mb-4">Graphical Method Root Finder</h2>

                    <div className="w-full">
                        <label className="block mb-2 text-lg font-medium">Input f(x)</label>
                        <input
                            type="text"
                            id="equation"
                            value={equation}
                            onChange={(e) => setEquation(e.target.value)}
                            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <label className="block mb-2 text-lg font-medium">Input X-Start</label>
                        <input
                            type="number"
                            id="X-Start"
                            value={xs}
                            onChange={(e) => setXs(parseFloat(e.target.value))}
                            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <label className="block mb-2 text-lg font-medium">Input X-End</label>
                        <input
                            type="number"
                            id="X-End"
                            value={xe}
                            onChange={(e) => setXe(parseFloat(e.target.value))}
                            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        onClick={() => calculateGraphical(xs, xe)}
                        className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors"
                    >
                        Calculate
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <div className="mb-4 text-2xl font-bold">
                        Equation: <MathEquation equation={`$${"f(x)"}=$ $${equation}$`} />
                    </div>

                    <h5 className="text-xl font-bold">
                        Answer = {root !== null ? Math.abs(root.toPrecision(7)) : 'Not found'}
                    </h5>
                </div>

                <div className="mt-8 w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-3xl font-bold mb-4 text-center">Graph</h3>
                    <Plot
                        data={[
                            {
                                x: iterations.map((iteration) => iteration.xValue),
                                y: iterations.map((iteration) => iteration.fX),
                                type: "scatter",
                                mode: "lines",
                                marker: { color: "blue" },
                                name: "f(x)"
                            },
                            {
                                x: root !== null ? [root] : [],
                                y: root !== null ? [evaluate(equation, { x: root })] : [],
                                type: "scatter",
                                mode: "markers",
                                marker: { color: "red", size: 10 },
                                name: "Root"
                            }
                        ]}
                        layout={{
                            title: "Function Plot",
                            xaxis: { title: "X" },
                            yaxis: { title: "f(x)" }
                        }}
                    />
                </div>

                <div className="mt-8 w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
                    <table className="table-auto w-full text-center border border-gray-300">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border border-gray-300">Iteration</th>
                                <th className="px-4 py-2 border border-gray-300">X</th>
                                <th className="px-4 py-2 border border-gray-300">f(X)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {iterations.map((element, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 border border-gray-300">{element.iteration}</td>
                                    <td className="px-4 py-2 border border-gray-300">{element.xValue.toFixed(4)}</td>
                                    <td className="px-4 py-2 border border-gray-300">{element.fX.toFixed(4)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default GraphicalMethod;
