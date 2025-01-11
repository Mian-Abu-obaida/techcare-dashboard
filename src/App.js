import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import DiagnosisHistory from "./DiagnosisHistory";
import PatientInfo from "./PatientInfo";
import DiagnosticList from "./DiagnosticList";
import LabResults from "./LabResults";
import "./index.css";

const App = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);

  return (
    <div className="bg-gray-100">
      <Header />
      <div className="flex flex-col lg:flex-row h-auto lg:h-[calc(100%-72px)]">
        <Sidebar onPatientSelect={setSelectedPatient} />
        <main className="flex-1 p-4 space-y-4">
          {selectedPatient ? (
            <>
              <DiagnosisHistory
                diagnosisHistory={selectedPatient.diagnosis_history}
                vitals={selectedPatient}
              />
              <DiagnosticList diagnosticList={selectedPatient.diagnostic_list} />
            </>
          ) : (
            <p>Please select a patient from the sidebar.</p>
          )}
        </main>
        <div className="w-full lg:w-1/4 p-4 flex flex-col gap-4">
          <PatientInfo selectedPatient={selectedPatient} />
          {/* Pass lab_results from selectedPatient to LabResults */}
          <LabResults labResults={selectedPatient ? selectedPatient.lab_results : []} />
        </div>
      </div>
    </div>
  );
};

export default App;
