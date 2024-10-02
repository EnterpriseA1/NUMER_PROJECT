import '../App.css'
import React, { useState, useEffect } from "react";
import { Button, Container, Form, Table, Row, Col } from "react-bootstrap";
import { evaluate } from "mathjs";
import Plot from "react-plotly.js";
import "bootstrap/dist/css/bootstrap.min.css";
import MathEquation from "../component/MathEquation";
import NavbarComponent from "../component/Navbar";
const BisectionMethod = () => {
    const [equation, setEquation] = useState("(x^4)-13");
    const [xl, setXL] = useState(0);
    const [xr, setXR] = useState(0);
    const [root, setRoot] = useState(0);
    const [iterations, setIterations] = useState([]);

    const error = (xOld, xNew) => Math.abs((xNew - xOld) / xNew) * 100;
    const calculateBisection = (xl, xr) => {
        let xm, fXm, fXr, ea;
        let iter = 0;
        const tolerance = 0.00001;
        const newIterations = [];

        do {
            xm = (xl + xr) / 2.0; // Calculate Xm
            const scopeXr = { x: xr };
            const scopeXm = { x: xm };
            fXr = evaluate(equation, scopeXr);
            fXm = evaluate(equation, scopeXm);
            iter++;
            if (xm == 0) {
                break;
            }
            if (fXm * fXr > 0) {
                ea = error(xr, xm);
                newIterations.push({ iteration: iter, Xl: xl, Xm: xm, Xr: xr });
                xr = xm; // Update XR
            } else {
                ea = error(xl, xm);
                newIterations.push({ iteration: iter, Xl: xl, Xm: xm, Xr: xr });
                xl = xm; // Update XL
            }
        } while (ea > tolerance);

        setRoot(xm);
        setIterations(newIterations);
    };

    useEffect(() => {
        // Create chart data when iterations change
        if (iterations.length > 0) {
            createChartData(iterations);
        }
    }, [iterations]);

    const createChartData = () => {
        // No need for chartData state as we will define data directly in Plotly
    };

    return (
        <>
            <NavbarComponent />
            <Container className="d-flex flex-column justify-content-center align-items-center border rounded p-4 mt-5" style={{ minHeight: '100vh' }}>
                <Container className="d-flex flex-column justify-content-center align-items-center border rounded p-4" >
                    <div className="d-flex flex-column align-items-center">
                        <h2 className="text-3xl font-bold mb-4">Bisection Method Calculator</h2> {/* เพิ่มชื่อเรื่อง */}
                    </div>

                    <Form className="d-flex flex-column align-items-center"> {/* จัดฟอร์มให้อยู่กลาง */}
                        <Form.Group className="mb-3">
                            <Form.Label >Input f(x)</Form.Label>
                            <input
                                type="text"
                                id="equation"
                                value={equation}
                                onChange={(e) => setEquation(e.target.value)}
                                style={{ width: "100%" }}
                                className="form-control"
                            />
                            <Form.Label>Input XL</Form.Label>
                            <input
                                type="number"
                                id="XL"
                                value={xl}
                                onChange={(e) => setXL(parseFloat(e.target.value))}
                                style={{ width: "100%" }}
                                className="form-control"
                            />
                            <Form.Label>Input XR</Form.Label>
                            <input
                                type="number"
                                id="XR"
                                value={xr}
                                onChange={(e) => setXR(parseFloat(e.target.value))}
                                style={{ width: "100%" }}
                                className="form-control"
                            />
                        </Form.Group>
                        <Button variant="dark" onClick={() => calculateBisection(xl, xr)}>
                            Calculate
                        </Button>
                    </Form>
                    <br />
                    <div className="mb-2 flex justify-center font-bold text-2xl">Equation : {<MathEquation equation={`$${"f(x)"}=$ $${equation}$`} />}</div>

                    <div>
                        <h5 className="d-flex flex-column justify-content-center align-items-center font-bold text-xl">Answer = {root.toPrecision(7)}</h5>
                    </div>
                </Container>

                
                    <Container className="d-flex flex-column justify-content-center align-items-center overflow-x-auto">
                        <h3 className="text-3xl font-bold mb-4" >Graph</h3>
                        <Plot
                            data={[
                                {
                                    x: [
                                        ...iterations.map(iteration => -iteration.iteration).reverse(), // เรียงลำดับค่าลบใหม่จากค่าลบมากไปหาน้อย
                                        ...iterations.map(iteration => iteration.iteration)   // ค่าบวกตามปกติ
                                    ],
                                    y: [
                                        ...iterations.map(iteration => evaluate(equation, { x: -iteration.iteration })).reverse(), // ค่าลบเรียงลำดับให้ถูกต้อง
                                        ...iterations.map(iteration => evaluate(equation, { x: iteration.iteration })),
                                    ],
                                    type: "scatter",
                                    mode: "lines",
                                    marker: { color: "blue" },
                                    name: "f(x)"
                                },
                                {
                                    x: iterations.map(iteration => iteration.Xm),
                                    y: iterations.map(iteration => evaluate(equation, { x: iteration.Xm })),// ค่าลบเรียงลำดับให้ถูกต้อง iteration.Xm),
                                    type: "scatter",
                                    mode: "lines+markers",
                                    marker: { color: "red" },
                                    name: "Xm Values"
                                },
                                {
                                    x: iterations.map(iteration => iteration.Xl),
                                    y: iterations.map(iteration => evaluate(equation, { x: iteration.Xl })),// iteration.Xl),
                                    type: "scatter",
                                    mode: "lines+markers",
                                    marker: { color: "Green" },
                                    name: "XL Values"
                                },
                                {
                                    x: iterations.map(iteration => iteration.Xr),
                                    y: iterations.map(iteration => evaluate(equation, { x: iteration.Xr })),// iteration.Xr),
                                    type: "scatter",
                                    mode: "lines+markers",
                                    marker: { color: "Cyan" },
                                    name: "XR Values"
                                }
                            ]}
                            layout={{
                                title: "Function Plot",
                                xaxis: { title: "Iteration" },
                                yaxis: { title: "f(x)" },
                            }}
                        />
                    </Container>


                
                <Container className="d-flex flex-column justify-content-center align-items-center overflow-x-auto">


                    <Container className="d-flex flex-column justify-content-center align-items-center mt-4 ">
                        <Table striped bordered hover variant="dark"  className='text-center'>
                            <thead>
                                <tr>
                                    <th width="25%">Iteration</th>
                                    <th width="25%">XL</th>
                                    <th width="25%">XM</th>
                                    <th width="25%">XR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {iterations.map((element, index) => (
                                    <tr key={index}>
                                        <td>{element.iteration}</td>
                                        <td>{element.Xl}</td>
                                        <td>{element.Xm}</td>
                                        <td>{element.Xr}</td>
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

export default BisectionMethod;

