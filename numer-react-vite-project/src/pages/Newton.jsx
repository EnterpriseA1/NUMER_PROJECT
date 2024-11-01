import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import MathEquation from "../component/MathEquation";
import NavbarComponent from "../component/Navbar";
import { evaluate, derivative, im } from "mathjs";
import axios from 'axios';
const NewtonRaphsonMethod = () => {
    const [equation, setEquation] = useState("x^4-13");
    const [initialX, setInitialX] = useState(2);
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
                method: 'Newton-Raphson',
                Equation: equation,
                x_start: initialX,  
                x_end: initialX,
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

    const calculateNewtonRaphson = (x0) => {
        let x = x0;
        let xPrev;
        let iter = 0;
        const tolerance = 0.00001;
        const maxIter = 100;
        const newIterations = [];
        
        // Get derivative expression
        const derivativeExpr = derivative(equation, 'x').toString();

        do {
            xPrev = x;
            
            // Calculate f(x) and f'(x)
            const fx = evaluate(equation, { x: x });
            const fPrime = evaluate(derivativeExpr, { x: x });
            
            // Newton-Raphson formula: x = x - f(x)/f'(x)
            x = x - (fx / fPrime);
            
            iter++;
            newIterations.push({
                iteration: iter,
                x: x,
                fx: fx,
                fPrime: fPrime,
                error: error(xPrev, x)
            });

            if (iter >= maxIter) break;
        } while (error(xPrev, x) > tolerance);

        setRoot(x);
        setIterations(newIterations);
        saveResult(x, newIterations[newIterations.length - 1].error);
    };

    return (
        <>
            <NavbarComponent />
            <div className="flex flex-col justify-center items-center border rounded p-4 mt-5 min-h-screen">
                <div className="flex flex-col justify-center items-center border rounded p-4">
                    <div className="flex flex-col items-center">
                        <h2 className="text-3xl font-bold mb-4">Newton-Raphson Method Calculator</h2>
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
                            <span className="text-lg">Initial Guess (x₀)</span>
                            <input
                                type="number"
                                value={initialX}
                                onChange={(e) => setInitialX(parseFloat(e.target.value))}
                                className="form-input mt-1 block w-full border rounded p-2"
                            />
                        </label>
                        <button
                            type="button"
                            onClick={() => calculateNewtonRaphson(initialX)}
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
                    <div className="mb-2 font-bold text-2xl">
                        Derivative:{" "}
                        {<MathEquation equation={`$${"f'(x)"}=$ $${derivative(equation, 'x').toString()}$`} />}
                    </div>

                    <div>
                        <h5 className="font-bold text-xl">Root = {root.toPrecision(7)}</h5>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center mt-4 w-full">
                    <h3 className="text-3xl font-bold mb-4">Graph</h3>
                    <div className="w-full flex justify-center overflow-hidden overflow-x-auto">
                        <Plot
                            data={[
                                {
                                    x: Array.from({ length: 200 }, (_, i) => -10 + i * 0.1),
                                    y: Array.from({ length: 200 }, (_, i) => 
                                        evaluate(equation, { x: -10 + i * 0.1 })),
                                    type: "scatter",
                                    mode: "lines",
                                    marker: { color: "blue" },
                                    name: "f(x)",
                                },
                                {
                                    x: iterations.map(iter => iter.x),
                                    y: iterations.map(iter => iter.fx),
                                    type: "scatter",
                                    mode: "markers",
                                    marker: { color: "red", size: 10 },
                                    name: "Iterations",
                                },
                            ]}
                            layout={{
                                title: "Function Plot with Newton-Raphson Iterations",
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
                                <th className="px-4 py-2 border border-gray-700">x</th>
                                <th className="px-4 py-2 border border-gray-700">f(x)</th>
                                <th className="px-4 py-2 border border-gray-700">f'(x)</th>
                                <th className="px-4 py-2 border border-gray-700">Error (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {iterations.map((element, index) => (
                                <tr key={index} className={`bg-gray-100 hover:bg-gray-200 ${index % 2 === 0 ? "bg-gray-50" : ""}`}>
                                    <td className="border px-4 py-2">{element.iteration}</td>
                                    <td className="border px-4 py-2">{element.x.toPrecision(7)}</td>
                                    <td className="border px-4 py-2">{element.fx.toPrecision(7)}</td>
                                    <td className="border px-4 py-2">{element.fPrime.toPrecision(7)}</td>
                                    <td className="border px-4 py-2">{element.error.toPrecision(7)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default NewtonRaphsonMethod;