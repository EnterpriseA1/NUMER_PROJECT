import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import MathEquation from "../component/MathEquation";
import NavbarComponent from "../component/Navbar";
import { evaluate } from "mathjs";
import axios from 'axios';

const SecantMethod = () => {
    const [equation, setEquation] = useState("x^4-13");
    const [x0, setX0] = useState(1);
    const [x1, setX1] = useState(2);
    const [root, setRoot] = useState(0);
    const [iterations, setIterations] = useState([]);
    const [savedResults, setSavedResults] = useState([]);
    const API_URL = 'https://numer-serverside.vercel.app/api';
     // Fetch saved results on component mount
    useEffect(() => {
        fetchSavedResults();
    }, []);

    const fetchSavedResults = async () => {
        try {
            const response = await axios.get(`${API_URL}/bisection`);
            setSavedResults(response.data);
        } catch (error) {
            console.error('Error fetching saved results:', error);
        }
    };

    useEffect(() => {
        setRoot(0);
        setIterations([]);
    }, [equation]);

    const saveResult = async (xm, lastError) => {
        try {
            const resultData = {
                method: 'Secant Method',
                Equation: equation,
                x_start: x0,  
                x_end: x1,
                result: xm,
                error: lastError.toString()
            };
    
            console.log('Sending data:', resultData); // Debug log
    
            const response = await axios.post(`${API_URL}/bisection`, resultData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            console.log('Save response:', response.data); // Debug log
            await fetchSavedResults();
        } catch (error) {
            console.error('Error saving result:', error.response?.data || error);
            // You might want to show this error to the user
            alert('Failed to save result: ' + (error.response?.data?.error || error.message));
        }
    };


    const error = (xOld, xNew) => Math.abs((xNew - xOld) / xNew) * 100;

    const calculateSecant = (x0, x1) => {
        let x_prev = parseFloat(x0);
        let x_curr = parseFloat(x1);
        let x_next;
        let iter = 0;
        const tolerance = 0.00001;
        const maxIter = 100;
        const newIterations = [];

        do {
            // Calculate function values
            const fx_prev = evaluate(equation, { x: x_prev });
            const fx_curr = evaluate(equation, { x: x_curr });

            // Calculate next x using Secant formula
            x_next = x_curr - (fx_curr * (x_curr - x_prev)) / (fx_curr - fx_prev);

            // Store iteration data
            newIterations.push({
                iteration: iter + 1,
                x_prev: x_prev,
                x_curr: x_curr,
                x_next: x_next,
                fx_prev: fx_prev,
                fx_curr: fx_curr,
                fx_next: evaluate(equation, { x: x_next }),
                error: iter > 0 ? error(x_curr, x_next) : null
            });

            // Update values for next iteration
            x_prev = x_curr;
            x_curr = x_next;
            iter++;

            if (iter >= maxIter) {
                console.log("Maximum iterations reached");
                break;
            }
        } while (error(x_prev, x_curr) > tolerance);

        setRoot(x_next);
        setIterations(newIterations);
        saveResult(x_next,newIterations[newIterations.length - 1].error);
    };

    // Generate points for plotting
    const generatePlotPoints = () => {
        const points = [];
        const xValues = iterations.map(iter => iter.x_next);
        const start = Math.min(...xValues) - 1;
        const end = Math.max(...xValues) + 1;
        const step = (end - start) / 200;

        for (let x = start; x <= end; x += step) {
            try {
                const fx = evaluate(equation, { x: x });
                points.push({ x: x, fx: fx });
            } catch (error) {
                continue;
            }
        }
        return points;
    };

    return (
        <>
            <NavbarComponent />
            <div className="flex flex-col justify-center items-center border rounded p-4 mt-5 min-h-screen">
                <div className="flex flex-col justify-center items-center border rounded p-4">
                    <div className="flex flex-col items-center">
                        <h2 className="text-3xl font-bold mb-4">Secant Method Calculator</h2>
                    </div>

                    <form className="flex flex-col items-center space-y-4">
                        <label className="block">
                            <span className="text-lg">Input f(x)</span>
                            <input
                                type="text"
                                value={equation}
                                onChange={(e) => setEquation(e.target.value)}
                                className="form-input mt-1 block w-full border rounded p-2"
                            />
                        </label>
                        <label className="block">
                            <span className="text-lg">Initial x₀</span>
                            <input
                                type="number"
                                value={x0}
                                onChange={(e) => setX0(parseFloat(e.target.value))}
                                className="form-input mt-1 block w-full border rounded p-2"
                            />
                        </label>
                        <label className="block">
                            <span className="text-lg">Initial x₁</span>
                            <input
                                type="number"
                                value={x1}
                                onChange={(e) => setX1(parseFloat(e.target.value))}
                                className="form-input mt-1 block w-full border rounded p-2"
                            />
                        </label>
                        <button
                            type="button"
                            onClick={() => calculateSecant(x0, x1)}
                            className="bg-gray-800 text-white px-4 py-2 rounded"
                        >
                            Calculate
                        </button>
                    </form>
                    <br />
                    <div className="mb-2 font-bold text-2xl">
                        Equation:{" "}
                        {<MathEquation equation={`$${"f(x)"}=$ $${equation}$`} />}
                    </div>

                    <div>
                        <h5 className="font-bold text-xl">Root = {root?.toPrecision(7)}</h5>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center mt-4 w-full">
                    <h3 className="text-3xl font-bold mb-4">Graph</h3>
                    <div className="w-full flex justify-center overflow-hidden overflow-x-auto">
                        <Plot
                            data={[
                                // Function curve
                                {
                                    x: generatePlotPoints().map(p => p.x),
                                    y: generatePlotPoints().map(p => p.fx),
                                    type: "scatter",
                                    mode: "lines",
                                    line: { color: 'rgb(0, 114, 189)', width: 2 },
                                    name: `f(x) = x^4-13`
                                },
                                // Secant lines
                                ...iterations.slice(0, -1).map((iter, index) => ({
                                    x: [iter.x_prev, iter.x_curr],
                                    y: [iter.fx_prev, iter.fx_curr],
                                    type: "scatter",
                                    mode: "lines",
                                    line: { color: 'red', width: 2 },
                                    name: index === 0 ? "Secant Lines" : "",
                                    showlegend: index === 0
                                })),
                                // Points
                                {
                                    x: iterations.map(iter => iter.x_curr),
                                    y: iterations.map(iter => iter.fx_curr),
                                    type: "scatter",
                                    mode: "markers",
                                    marker: { color: 'red', size: 8 },
                                    name: "Points"
                                }
                            ]}
                            layout={{
                                title: "Secant Method Visualization",
                                xaxis: {
                                    title: "x",
                                    gridcolor: 'lightgray',
                                    zerolinecolor: 'lightgray',
                                    dtick: 0.5,
                                    tickformat: '.1f'
                                },
                                yaxis: {
                                    title: "f(x)",
                                    gridcolor: 'lightgray',
                                    zerolinecolor: 'lightgray',
                                    dtick: 10, 
                                    tickformat: '.0f'
                                },
                                plot_bgcolor: 'white',
                                paper_bgcolor: 'white',
                                showlegend: true,
                                legend: {
                                    x: 1.1,
                                    y: 1,
                                    xanchor: 'left',
                                    yanchor: 'top',
                                    bgcolor: 'rgba(255,255,255,0)',
                                    bordercolor: 'rgba(255,255,255,0)'
                                },
                                width: 900,
                                height: 500,
                                margin: { t: 50, r: 150, b: 50, l: 50 },
                                grid: {
                                    rows: 1,
                                    columns: 1,
                                    pattern: 'independent'
                                }
                            }}
                            config={{
                                responsive: true,
                                displayModeBar: true
                            }}
                        />
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center mt-4 w-full overflow-x-auto">
                    <table className="min-w-full table-auto text-center border-collapse border border-gray-800">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="px-4 py-2 border border-gray-700">Iteration</th>
                                <th className="px-4 py-2 border border-gray-700">x₀</th>
                                <th className="px-4 py-2 border border-gray-700">x₁</th>
                                <th className="px-4 py-2 border border-gray-700">x₂</th>
                                <th className="px-4 py-2 border border-gray-700">Error (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {iterations.map((element, index) => (
                                <tr key={index} className={`bg-gray-100 hover:bg-gray-200 ${index % 2 === 0 ? "bg-gray-50" : ""}`}>
                                    <td className="border px-4 py-2">{element.iteration}</td>
                                    <td className="border px-4 py-2">{element.x_prev.toPrecision(7)}</td>
                                    <td className="border px-4 py-2">{element.x_curr.toPrecision(7)}</td>
                                    <td className="border px-4 py-2">{element.x_next.toPrecision(7)}</td>
                                    <td className="border px-4 py-2">{element.error?.toPrecision(7) || "-"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default SecantMethod;

