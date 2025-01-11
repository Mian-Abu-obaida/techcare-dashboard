import { FaCalendarAlt, FaVenus, FaPhoneAlt } from "react-icons/fa";
import { MdContactEmergency, MdHealthAndSafety } from "react-icons/md";

const PatientInfo = ({ selectedPatient }) => {
  // Fallback data if selectedPatient is undefined
  const defaultPatient = {
    name: "Unknown Patient",
    profile_picture: "https://via.placeholder.com/150",
    date_of_birth: "N/A",
    gender: "N/A",
    phone_number: "N/A",
    emergency_contact: "N/A",
    insurance_type: "N/A",
  };

  const patient = selectedPatient || defaultPatient;

  return (
    <div className="bg-white p-6 rounded-lg shadow text-center">
      <img
        src={patient.profile_picture}
        alt={patient.name}
        className="w-24 h-24 rounded-full mx-auto"
      />
      <h3 className="text-lg font-bold mt-4">{patient.name}</h3>

      <div className="mt-4 text-left space-y-4">
        <div className="flex items-center space-x-2">
          <FaCalendarAlt className="text-gray-600" />
          <div>
            <p className="text-sm font-semibold">Date Of Birth</p>
            <p className="text-sm text-gray-600">{patient.date_of_birth}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <FaVenus className="text-gray-600" />
          <div>
            <p className="text-sm font-semibold">Gender</p>
            <p className="text-sm text-gray-600">{patient.gender}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <FaPhoneAlt className="text-gray-600" />
          <div>
            <p className="text-sm font-semibold">Contact Info</p>
            <p className="text-sm text-gray-600">{patient.phone_number}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <MdContactEmergency className="text-gray-600" />
          <div>
            <p className="text-sm font-semibold">Emergency Contacts</p>
            <p className="text-sm text-gray-600">{patient.emergency_contact}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <MdHealthAndSafety className="text-gray-600" />
          <div>
            <p className="text-sm font-semibold">Insurance Provider</p>
            <p className="text-sm text-gray-600">{patient.insurance_type}</p>
          </div>
        </div>
      </div>

      <button className="mt-6 px-4 py-2  font-semibold rounded-full" style={{backgroundColor: "#01F0D0"}}>
        Show All Information
      </button>
    </div>
  );
};

export default PatientInfo;
