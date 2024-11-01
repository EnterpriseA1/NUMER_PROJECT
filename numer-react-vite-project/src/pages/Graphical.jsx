import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import MathEquation from "../component/MathEquation";
import NavbarComponent from "../component/Navbar";
import { evaluate, log, pow, floor, abs } from 'mathjs';
import axios from 'axios';
const GraphicalMethod = () => {
    const [equation, setEquation] = useState("x^4-13");
    const [xl, setXL] = useState(0);
    const [xr, setXR] = useState(0);
    const [hasCalculated, setHasCalculated] = useState(false);
    const [result, setResult] = useState({
        result: 0,
        iter: 0,
        iterations: []
    });
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

    const error = (xOld, xNew) => Math.abs((xNew - xOld) / xNew) * 100;

    useEffect(() => {
        setRoot(0);
        setIterations([]);
    }, [equation]);

    const saveResult = async (xm, lastError) => {
        try {
            const resultData = {
                method: 'Graphical',
                Equation: equation,
                x_start: xl,
                x_end: xr,
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

    const calculateGraphical = (xl, xr) => {
        // Calculate step size using logarithm
        const calculateStep = (xStart, xEnd) => {
            const step = log(xEnd - xStart, 10);
            if (step % 1 === 0) return Number(pow(10, step - 1));
            return Number(pow(10, floor(step)));
        };
       

        

        if (xl >= xr) {
            alert('X Start must be less than X End');
            return;
        }

        let step = calculateStep(xl, xr);
        const MAX_ITER = 1000;
        let iter = 0;
        let x = xl;
        let temp;

        try {
            temp = evaluate(equation, { x: xl });
        } catch (error) {
            alert('Invalid function');
            return;
        }

        const iterations = [];
        let newTemp;

        // Generate plot points for smooth curve
        const plotPoints = [];
        const plotStep = (xr - xl) / 200;
        for (let plotX = xl; plotX <= xr; plotX += plotStep) {
            try {
                const plotY = evaluate(equation, { x: plotX });
                plotPoints.push({ x: plotX, y: plotY });
            } catch (error) {
                continue;
            }
        }

        // Main iteration
        while (iter < MAX_ITER) {
            iter += 1;
            if (iter === MAX_ITER) {
                alert('Max iteration reached');
                break;
            }

            newTemp = evaluate(equation, { x });
            iterations.push({ x: Number(x), y: newTemp });

            if (abs(newTemp) < 0.0001) {
                break;
            }

            if (temp * newTemp < 0) {
                x -= step;
                step /= 10;
                newTemp = evaluate(equation, { x });
            }

            if (x === xr) break;
            x += step;
            if (x > xr) {
                x = xr;
            }
            temp = newTemp;
        }
        setResult({
            result: x,
            iter: iter,
            iterations: [...plotPoints, ...iterations]
        });

        setHasCalculated(true);
        saveResult(x, error(xl, x));
    };

    return (
        <>
            <NavbarComponent />
            <div className="flex flex-col justify-center items-center border rounded p-4 mt-5 min-h-screen">
                <div className="flex flex-col justify-center items-center border rounded p-4">
                    <div className="flex flex-col items-center">
                        <h2 className="text-3xl font-bold mb-4">Graphical Method</h2>
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
                            <span className="text-lg">Input X Start</span>
                            <input
                                type="number"
                                value={xl}
                                onChange={(e) => setXL(parseFloat(e.target.value))}
                                className="form-input mt-1 block w-full border rounded p-2"
                            />
                        </label>
                        <label className="block">
                            <span className="text-lg">Input X End</span>
                            <input
                                type="number"
                                value={xr}
                                onChange={(e) => setXR(parseFloat(e.target.value))}
                                className="form-input mt-1 block w-full border rounded p-2"
                            />
                        </label>
                        <button
                            type="button"
                            onClick={() => calculateGraphical(xl, xr)}
                            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
                        >
                            Calculate
                        </button>
                    </form>
                    <br />
                    <div className="mb-2 font-bold text-2xl">
                        Equation:{" "}
                        {<MathEquation equation={`$${"f(x)"}=$ $${equation}$`} />}
                    </div>

                    {hasCalculated && (
                        <div>
                            <h5 className="font-bold text-xl">Answer = {result.result.toPrecision(7)}</h5>
                        </div>
                    )}
                </div>

                <div className="flex flex-col justify-center items-center mt-4 w-full">
                    <h3 className="text-3xl font-bold mb-4">Graph</h3>
                    <div className="w-full flex justify-center overflow-hidden overflow-x-auto">
                        <Plot
                            data={hasCalculated ? [
                                {
                                    x: result.iterations.slice(0, 200).map(point => point.x),
                                    y: result.iterations.slice(0, 200).map(point => point.y),
                                    type: "scatter",
                                    mode: "lines",
                                    line: { color: "blue", width: 2 },
                                    name: "f(x)"
                                },
                                {
                                    x: result.iterations.slice(200).map(point => point.x),
                                    y: result.iterations.slice(200).map(point => point.y),
                                    type: "scatter",
                                    mode: "markers",
                                    marker: { color: "red", size: 8 },
                                    name: "Search Points"
                                },
                                {
                                    x: [result.result],
                                    y: [evaluate(equation, { x: result.result })],
                                    type: "scatter",
                                    mode: "markers",
                                    marker: { color: "green", size: 12, symbol: "star" },
                                    name: "Root"
                                }
                            ] : []}
                            layout={{
                                title: "Function Plot",
                                xaxis: { title: "x" },
                                yaxis: { title: "f(x)" },
                                autosize: true,
                                width: window.innerWidth < 768 ? window.innerWidth - 40 : undefined,
                                showlegend: true
                            }}
                        />
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center mt-4 w-full overflow-x-auto">
                    <table className="min-w-full table-auto text-center border-collapse border border-gray-800">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="px-4 py-2 border border-gray-700">Iteration</th>
                                <th className="px-4 py-2 border border-gray-700">X</th>
                                <th className="px-4 py-2 border border-gray-700">f(x)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hasCalculated ? result.iterations.slice(200).map((point, index) => (
                                <tr key={index} className={`bg-gray-100 hover:bg-gray-200 ${index % 2 === 0 ? "bg-gray-50" : ""}`}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{point.x.toPrecision(7)}</td>
                                    <td className="border px-4 py-2">{point.y.toPrecision(7)}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td className="border px-4 py-2">-</td>
                                    <td className="border px-4 py-2">-</td>
                                    <td className="border px-4 py-2">-</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default GraphicalMethod;