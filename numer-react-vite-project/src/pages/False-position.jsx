import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import MathEquation from "../component/MathEquation";
import NavbarComponent from "../component/Navbar";
import { evaluate } from "mathjs";
import axios from 'axios'; 



const FalsePositionMethod = () => {
    const [equation, setEquation] = useState("x^4-13");
    const [xl, setXL] = useState(0);
    const [xr, setXR] = useState(0);
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

    const error = (xOld, xNew) => Math.abs((xNew - xOld) / xNew) * 100;

    useEffect(() => {
        setRoot(0);
        setIterations([]);
    }, [equation]);

    const saveResult = async (xm, lastError) => {
        try {
            const resultData = {
                method: 'False-Position',
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
    
    const calculateFalsePosition = (xl, xr) => {
        let xm, fXm, fXl, fXr, ea;
        let iter = 0;
        const tolerance = 0.00001;
        const newIterations = [];

        do {
            const scopeXl = { x: xl };
            const scopeXr = { x: xr };
            fXl = evaluate(equation, scopeXl);
            fXr = evaluate(equation, scopeXr);

            // Calculate Xm using the False Position formula
            xm = xl - (fXl * (xr - xl)) / (fXr - fXl);
            const scopeXm = { x: xm };
            fXm = evaluate(equation, scopeXm);
            iter++;

            newIterations.push({ iteration: iter, Xl: xl, Xm: xm, Xr: xr, Error: error(xl, xm) });

            if (fXm * fXl < 0) {
                xr = xm; // Update XR
            } else {
                xl = xm; // Update XL
            }

            ea = Math.abs(fXm); // Update error based on function value
        } while (ea > tolerance);

        setRoot(xm);
        setIterations(newIterations);
        saveResult(xm, ea);
    };

    return (
        <>
            <NavbarComponent />
            <div className="flex flex-col justify-center items-center border rounded p-4 mt-5 min-h-screen">
                <div className="flex flex-col justify-center items-center border rounded p-4">
                    <div className="flex flex-col items-center">
                        <h2 className="text-3xl font-bold mb-4">False Position Method Calculator</h2>
                    </div>

                    <form className="flex flex-col items-center space-y-4">
                        <label className="block">
                            <span className="text-lg">Input f(x)</span>
                            <input
                                type="text"
                                id="equation"
                                value={equation}
                                onChange={(e) => setEquation(e.target.value)}
                                className="form-input mt-1 block w-full border rounded p-2"
                            />
                        </label>
                        <label className="block">
                            <span className="text-lg">Input XL</span>
                            <input
                                type="number"
                                id="XL"
                                value={xl}
                                onChange={(e) => setXL(parseFloat(e.target.value))}
                                className="form-input mt-1 block w-full border rounded p-2"
                            />
                        </label>
                        <label className="block">
                            <span className="text-lg">Input XR</span>
                            <input
                                type="number"
                                id="XR"
                                value={xr}
                                onChange={(e) => setXR(parseFloat(e.target.value))}
                                className="form-input mt-1 block w-full border rounded p-2"
                            />
                        </label>
                        <button
                            type="button"
                            onClick={() => calculateFalsePosition(xl, xr)}
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
                        <h5 className="font-bold text-xl">Answer = {root.toPrecision(7)}</h5>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center mt-4 w-full">
                    <h3 className="text-3xl font-bold mb-4">Graph</h3>
                    <div className="w-full flex justify-center overflow-hidden overflow-x-auto">
                        <Plot
                            data={[
                                {
                                    x: [
                                        ...iterations.map((iteration) => -iteration.iteration).reverse(),
                                        ...iterations.map((iteration) => iteration.iteration),
                                    ],
                                    y: [
                                        ...iterations
                                            .map((iteration) =>
                                                evaluate(equation, { x: -iteration.iteration })
                                            )
                                            .reverse(),
                                        ...iterations.map((iteration) =>
                                            evaluate(equation, { x: iteration.iteration })
                                        ),
                                    ],
                                    type: "scatter",
                                    mode: "lines",
                                    marker: { color: "blue" },
                                    name: "f(x)",
                                },
                                {
                                    x: iterations.map((iteration) => iteration.Xm),
                                    y: iterations.map((iteration) => evaluate(equation, { x: iteration.Xm })),
                                    type: "scatter",
                                    mode: "lines+markers",
                                    marker: { color: "red" },
                                    name: "Xm Values",
                                },
                                {
                                    x: iterations.map((iteration) => iteration.Xl),
                                    y: iterations.map((iteration) => evaluate(equation, { x: iteration.Xl })),
                                    type: "scatter",
                                    mode: "lines+markers",
                                    marker: { color: "green" },
                                    name: "XL Values",
                                },
                                {
                                    x: iterations.map((iteration) => iteration.Xr),
                                    y: iterations.map((iteration) => evaluate(equation, { x: iteration.Xr })),
                                    type: "scatter",
                                    mode: "lines+markers",
                                    marker: { color: "cyan" },
                                    name: "XR Values",
                                },
                            ]}
                            layout={{
                                title: "Function Plot",
                                xaxis: { title: "X Values" },
                                yaxis: { title: "f(x)" },
                                autosize: true,
                                width: window.innerWidth < 768 ? window.innerWidth - 40 : undefined,
                            }}
                        />
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center mt-4 w-full overflow-x-auto">
                    <table className="min-w-full table-auto text-center border-collapse border border-gray-800">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="px-4 py-2 border border-gray-700">Iteration</th>
                                <th className="px-4 py-2 border border-gray-700">XL</th>
                                <th className="px-4 py-2 border border-gray-700">XM</th>
                                <th className="px-4 py-2 border border-gray-700">XR</th>
                                <th className="px-4 py-2 border border-gray-700">Error</th>
                            </tr>
                        </thead>
                        <tbody>
                            {iterations.map((element, index) => (
                                <tr key={index} className={`bg-gray-100 hover:bg-gray-200 ${index % 2 === 0 ? "bg-gray-50" : ""}`}>
                                    <td className="border px-4 py-2">{element.iteration}</td>
                                    <td className="border px-4 py-2">{element.Xl.toPrecision(7)}</td>
                                    <td className="border px-4 py-2">{element.Xm.toPrecision(7)}</td>
                                    <td className="border px-4 py-2">{element.Xr.toPrecision(7)}</td>
                                    <td className="border px-4 py-2">{element.Error.toPrecision(7)}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default FalsePositionMethod;
