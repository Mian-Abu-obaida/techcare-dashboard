import React from "react";
import { FaCircle } from "react-icons/fa";

const DiagnosticList = ({ diagnosticList = [] }) => {
  // Function to render status with icon
  const renderStatus = (status) => {
    let color;
    switch (status) {
      case "Active":
        color = "text-green-500";
        break;
      case "Cured":
        color = "text-blue-500";
        break;
      case "Inactive":
        color = "text-gray-500";
        break;
      case "Under Observation":
        color = "text-yellow-500";
        break;
      default:
        color = "text-gray-500";
    }
    return (
      <div className="flex items-center gap-2">
        <FaCircle className={color} size={10} />
        <span>{status}</span>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-4xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Diagnostic List</h2>
      <div className="max-h-40 overflow-hidden md:overflow-auto scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300 scrollbar-track:!roundedsn lg:supports-scrollbars:pr-2">
        <table className="w-full text-sm table-auto">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="text-left px-4 py-2">Problem/Diagnosis</th>
              <th className="text-left px-4 py-2">Description</th>
              <th className="text-left px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {diagnosticList.length > 0 ? (
              diagnosticList.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.description}</td>
                  <td className="px-4 py-2">{renderStatus(item.status)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No diagnostic data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiagnosticList;
