import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const Sidebar = ({ onPatientSelect }) => {
  const [patients, setPatients] = useState([]); // Patient list
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [searchVisible, setSearchVisible] = useState(false); // Toggle search bar visibility
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(
          "https://fedskillstest.coalitiontechnologies.workers.dev",
          {
            method: "GET",
            headers: {
              Authorization: `Basic ${btoa("coalition:skills-test")}`, // Basic auth
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched patients:", data); // Debugging API response
        setPatients(data); // Update patient list
      } catch (err) {
        console.error("Error fetching patients:", err.message);
        setError(err.message); // Capture errors
      } finally {
        setLoading(false); // Disable loading state
      }
    };

    fetchPatients();
  }, []);

  // Filter patients based on the search term
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside className="bg-white w-full lg:w-64 border-r p-4 flex flex-col">
      {/* Top Section: Search Toggle and Title */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Patients</h2>
        <FaSearch
          className="text-gray-500 cursor-pointer"
          size={20}
          onClick={() => setSearchVisible((prev) => !prev)} // Toggle search visibility
        />
      </div>

      {/* Search Bar */}
      {searchVisible && (
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search patients..."
            className="w-full p-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {/* Loading and Error States */}
      {loading && <p>Loading patients...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* No Patients Found */}
      {!loading && filteredPatients.length === 0 && (
        <p>No patients found. Try another search.</p>
      )}

      {/* Patient List with Custom Scrollbar */}
      <div
        className="flex-1 overflow-hidden md:overflow-auto scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300 scrollbar-track:!roundedsn lg:supports-scrollbars:pr-2"
        style={{
          maxHeight: "calc(100vh - 72px - 40px)", // Subtract header and other content height
        }}
      >
        <ul className="space-y-2">
          {filteredPatients.map((patient, index) => (
            <li
              key={index}
              className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
              onClick={() => onPatientSelect(patient)} // Pass selected patient data
            >
              <img
                src={patient.profile_picture || "https://via.placeholder.com/40"}
                alt={patient.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-semibold">{patient.name}</p>
                <small className="text-gray-500">
                  {patient.gender}, {patient.age} years
                </small>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
