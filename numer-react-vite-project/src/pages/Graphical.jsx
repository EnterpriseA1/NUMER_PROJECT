import '../App.css';
import React, { useState } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import { evaluate } from 'mathjs';
import Plot from 'react-plotly.js';
import 'bootstrap/dist/css/bootstrap.min.css';
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

        // Find a starting point where f(x) changes sign
        while (xStart < xEnd && fxnum <= 0) {
            xStart++;
            fxnum = evaluate(equation, { x: xStart });
        }

        // If no valid point is found, alert and return
        if (fxnum > 0) {
            let tole = [1e-1, 1e-2, 1e-3, 1e-4, 1e-5, 1e-6, 1e-7];
            let count = 0;
            let ztemp = xStart;
            let iter = 0;

            // Iterate through the tolerances to find the root
            while (count < tole.length && ztemp < xEnd) {
                let fxCurrent = evaluate(equation, { x: ztemp });

                // Check if f(x) is positive
                if (fxCurrent > 0) {
                    ztemp -= tole[count];  // Move back
                    count++;
                } else {
                    newData.push({ iteration: iter, xValue: ztemp, fX: fxCurrent });
                    iter++;
                    ztemp += tole[count];  // Move forward
                }
            }

            // Set results for the root and iterations
            setIterations(newData);
            setRoot(ztemp);
        } else {
            alert('No valid roots found in the given range.');
        }
    };

    return (
        <>
            <NavbarComponent />
            <Container className="d-flex flex-column justify-content-center align-items-center border rounded p-4 mt-5" style={{ minHeight: '100vh' }}>
                <Container className="d-flex flex-column justify-content-center align-items-center border rounded p-4">
                    <div className="d-flex flex-column align-items-center">
                        <h2 className="text-3xl font-bold mb-4">Graphical Method Root Finder</h2>
                    </div>

                    <Form className="d-flex flex-column align-items-center">
                        <Form.Group className="mb-3">
                            <Form.Label>Input f(x)</Form.Label>
                            <input
                                type="text"
                                id="equation"
                                value={equation}
                                onChange={(e) => setEquation(e.target.value)}
                                style={{ width: '100%' }}
                                className="form-control"
                            />
                            <Form.Label>Input X-Start</Form.Label>
                            <input
                                type="number"
                                id="X-Start"
                                value={xs}
                                onChange={(e) => setXs(parseFloat(e.target.value))}
                                style={{ width: '100%' }}
                                className="form-control"
                            />
                            <Form.Label>Input X-End</Form.Label>
                            <input
                                type="number"
                                id="X-end"
                                value={xe}
                                onChange={(e) => setXe(parseFloat(e.target.value))}
                                style={{ width: '100%' }}
                                className="form-control"
                            />
                        </Form.Group>
                        <Button variant="dark" onClick={() => calculateGraphical(xs, xe)}>
                            Calculate
                        </Button>
                    </Form>

                    <br />
                    <div className="mb-2 flex justify-center font-bold text-2xl">
                        Equation : <MathEquation equation={`$${"f(x)"}=$ $${equation}$`} />
                    </div>

                    <div>
                        <h5 className="d-flex flex-column justify-content-center align-items-center font-bold text-xl">
                            Answer = {root !== null ? Math.abs(root.toPrecision(7)) : 'Not found'}
                        </h5>
                    </div>
                </Container>

                <Container className="d-flex flex-column justify-content-center align-items-center overflow-x-auto">
                    <h3 className="text-3xl font-bold mb-4">Graph</h3>
                    <Plot
                        data={[
                            {
                                x: iterations.map(iteration => iteration.xValue), // Use xValue from iterations for x-axis
                                y: iterations.map(iteration => iteration.fX), // Use fX from iterations for y-axis
                                type: "scatter",
                                mode: "lines",
                                marker: { color: "blue" },
                                name: "f(x)"
                            },
                            {
                                x: root !== null ? [root] : [], // Only plot root if it's found
                                y: root !== null ? [evaluate(equation, { x: root })] : [], // Evaluate f(x) at the root
                                type: "scatter",
                                mode: "markers",
                                marker: { color: "red", size: 10 },
                                name: "Root"
                            },
                            {
                                x: iterations.map((_, index) => index), // Create x values for Xs
                                y: iterations.map(iteration => iteration.xValue), // Use xValue for Y
                                type: "scatter",
                                mode: "lines+markers",
                                marker: { color: "green" },
                                name: "X-Start Values"
                            },
                            {
                                x: iterations.map((_, index) => index), // Create x values for Xe
                                y: iterations.map(iteration => iteration.xValue + 1), // Sample logic for Xe, replace with your logic
                                type: "scatter",
                                mode: "lines+markers",
                                marker: { color: "cyan" },
                                name: "X-End Values"
                            }
                        ]}
                        layout={{
                            title: "Function Plot",
                            xaxis: { title: "X" },
                            yaxis: { title: "f(x)" },
                        }}
                    />
                        
                </Container>

                <Container className="d-flex flex-column justify-content-center align-items-center overflow-x-auto">
                    <Container className="d-flex flex-column justify-content-center align-items-center mt-4">
                        <Table striped bordered hover variant="dark" className="text-center">
                            <thead>
                                <tr>
                                    <th>Iteration</th>
                                    <th>X</th>
                                    <th>f(X)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {iterations.map((element, index) => (
                                    <tr key={index}>
                                        <td>{element.iteration}</td>
                                        <td>{element.xValue.toFixed(4)}</td>
                                        <td>{element.fX.toFixed(4)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Container>
                </Container>
            </Container>
        </>
    );
};

export default GraphicalMethod;
