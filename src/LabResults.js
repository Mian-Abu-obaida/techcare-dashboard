import React from "react";
import { FaDownload } from "react-icons/fa";

const LabResults = ({ labResults }) => {
  const handleDownload = (result) => {
    console.log(`Downloading result: ${result}`);
    // Add download logic here if needed
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-4">Lab Results</h3>
      <div className="h-40 overflow-hidden md:overflow-auto scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300 scrollbar-track:!roundedsn lg:supports-scrollbars:pr-2">
        <ul className="space-y-4">
          {labResults.length > 0 ? (
            labResults.map((result, index) => (
              <li
                key={index}
                className={`flex justify-between items-center px-2 py-1 rounded ${
                  index % 2 === 0 ? "bg-gray-100" : ""
                }`}
              >
                <span className="text-gray-700">{result}</span>
                <FaDownload
                  className="text-gray-600 cursor-pointer"
                  onClick={() => handleDownload(result)} // Trigger download
                />
              </li>
            ))
          ) : (
            <li className="text-gray-500 text-center">
              No lab results available.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default LabResults;
