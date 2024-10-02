import React, { useState } from "react"; // Importing useState
import NavbarComponent from "../component/Navbar"; // Import your NavbarComponent

const HomePage = () => {
  const [selectedOption, setSelectedOption] = useState(""); // Hook for managing selected option

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <NavbarComponent />
      {/* Add padding to the container to prevent overlap with the navbar */}
      <div className="mt-20 flex justify-center items-center min-h-screen">
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Welcome to My Website
          </h1>
          <label htmlFor="listbox" className="block text-lg mb-2">
            Choose an option:&nbsp;
          </label>
          <select
            id="listbox"
            value={selectedOption}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="">-- Select an option --</option>
            <option value="Graphical">Graphical</option>
            <option value="/Bisection">Bisection</option>
            <option value="False-Position">False-Position</option>
          </select>
          <br />
          <button
            onClick={() => alert(selectedOption)}
            className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900 transition-colors"
          >
            Go
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
