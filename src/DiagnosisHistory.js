import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import Card from "./Card";
import lungsIcon from "./assets/Images/Lungs.png";
import heartIcon from "./assets/Images/Heart.png";
import tempIcon from "./assets/Images/Temperature.png";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DiagnosisHistory = ({ diagnosisHistory = [], vitals = {} }) => {
  const [filter, setFilter] = useState("6 months");

  // Parse the filter to get the number of months
  const filterMonths = parseInt(filter.split(" ")[0]);

  // Dynamically filter the diagnosisHistory based on the selected filter
  const filteredData = diagnosisHistory.slice(-filterMonths);

  // Generate chart data dynamically from the filtered diagnosisHistory
  const dataByFilter = filteredData.reduce(
    (acc, record) => {
      const label = `${record.month} ${record.year}`;
      acc.labels.push(label);
      acc.systolic.push(record.blood_pressure.systolic.value);
      acc.diastolic.push(record.blood_pressure.diastolic.value);
      return acc;
    },
    { labels: [], systolic: [], diastolic: [] }
  );

  const data = {
    labels: dataByFilter.labels,
    datasets: [
      {
        label: "Systolic",
        data: dataByFilter.systolic,
        borderColor: "#e74c3c",
        backgroundColor: "rgba(231, 76, 60, 0.2)",
        tension: 0.4,
        pointBackgroundColor: "#e74c3c",
        pointRadius: 5,
      },
      {
        label: "Diastolic",
        data: dataByFilter.diastolic,
        borderColor: "#9b59b6",
        backgroundColor: "rgba(155, 89, 182, 0.2)",
        tension: 0.4,
        pointBackgroundColor: "#9b59b6",
        pointRadius: 5,
      },
    ],
  };

  const latestRecord = filteredData[filteredData.length - 1] || {};
  const latestSystolic = latestRecord?.blood_pressure?.systolic?.value || "N/A";
  const latestDiastolic = latestRecord?.blood_pressure?.diastolic?.value || "N/A";

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-12">Diagnosis History</h2>

      <div className="p-4 rounded-lg flex flex-col md:flex-row md:items-center" style={{backgroundColor: "#F4F0FE"}}>
        {/* Left Side: Chart */}
        <div className="w-full md:w-2/3">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Blood Pressure</h3>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="text-gray-500 text-sm text-semibold cursor-pointer border-0 p-1 rounded bg-transparent"
            >
              {Array.from({ length: 12 }, (_, i) => `${i + 1} months`).map((label) => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="h-64">
            <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Right Side: Systolic and Diastolic Information */}
        <div className="w-full md:w-1/3 flex flex-col justify-center space-y-8 mt-4 md:mt-0 md:pl-6">
          {/* Systolic */}
          <div className="flex items-center space-x-4">
            <span className="w-3 h-3 rounded-full bg-pink-500"></span>
            <div>
              <p className="text-lg font-bold">Systolic</p>
              <p className="text-3xl font-bold">{latestSystolic}</p>
              <p className="text-sm text-gray-500 flex items-center">
                <FaArrowUp className="text-green-500 mr-1" /> Higher than Average
              </p>
            </div>
          </div>

          {/* Diastolic */}
          <div className="flex items-center space-x-4">
            <span className="w-3 h-3 rounded-full bg-purple-500"></span>
            <div>
              <p className="text-lg font-bold">Diastolic</p>
              <p className="text-3xl font-bold">{latestDiastolic}</p>
              <p className="text-sm text-gray-500 flex items-center">
                <FaArrowDown className="text-red-500 mr-1" /> Lower than Average
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-4">
        <Card
          icon={lungsIcon}
          title="Respiratory Rate"
          value={latestRecord.respiratory_rate?.value || "N/A"}
          unit="bpm"
          status={latestRecord.respiratory_rate?.levels || "N/A"}
          bgColor="#E0F3FA"
        />
        <Card
          icon={tempIcon}
          title="Temperature"
          value={latestRecord.temperature?.value || "N/A"}
          unit="F"
          status={latestRecord.temperature?.levels || "N/A"}
          bgColor="#FFE6E9"
        />
        <Card
          icon={heartIcon}
          title="Heart Rate"
          value={latestRecord.heart_rate?.value || "N/A"}
          unit="bpm"
          status={latestRecord.heart_rate?.levels || "N/A"}
          bgColor="#FFE6F1"
        />
      </div>
    </div>
  );
};

export default DiagnosisHistory;
