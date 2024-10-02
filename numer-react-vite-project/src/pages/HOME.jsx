import React, { useState } from "react"; // Importing useState
import { Container, Row, Col, Button } from "/react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styles
import NavbarComponent from "../component/Navbar"; // Import your NavbarComponent

const HomePage = () => {
    const [selectedOption, setSelectedOption] = useState(""); // Hook for managing selected option

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <>
            <NavbarComponent />
            {/* Add margin to the container to prevent overlap with the navbar */}
            <Container className="mt-20"> {/* Adjusted margin to ensure no overlap */}
                <Row className="justify-content-center">
                    <Col xs={12} md={8} lg={6}>
                        <div className="text-center p-6 sm:p-8 md:p-10 bg-white rounded-lg shadow-lg mb-10">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
                                Welcome to My Website
                            </h1>
                            <label htmlFor="listbox">Choose an option:&nbsp;</label>
                            <select id="listbox" value={selectedOption} onChange={handleChange} className="bg-white mb-3">
                                <option value="">-- Select an option --</option>
                                <option value="Graphical">Graphical</option>
                                <option value="/Bisection">Bisection</option>
                                <option value="False-Position">False-Position</option>
                            </select>
                            <br />
                            <Button variant="dark" onClick={() => alert(selectedOption)}>
                                Go
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default HomePage;
