import React, { useState } from 'react';
import TestLogo from './assets/Images/TestLogo@2x.png';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { 
  FaHome, 
  FaUserFriends, 
  FaCalendarAlt, 
  FaEnvelope, 
  FaCreditCard, 
  FaCog, 
  FaEllipsisV 
} from 'react-icons/fa';
import DoctorPhoto from './assets/Images/senior-woman-doctor-and-portrait-smile-for-health-2023-11-27-05-18-16-utc@2x.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex flex-wrap justify-between items-center px-4 py-3 bg-gray-50 border-b md:px-6">
      {/* Logo Section */}
      <div className="flex items-center">
        <img src={TestLogo} alt="TechCare Logo" className="w-36 h-auto" />
      </div>

      {/* Hamburger Menu (Small Screens) */}
      <button
        className="block md:hidden text-gray-600 focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Navigation Links */}
      <nav
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } w-full md:flex md:w-auto space-y-4 md:space-y-0 md:space-x-6 text-gray-600 mt-4 md:mt-0`}
      >
        <a href="#" className="flex items-center hover:text-cyan-600 p-2">
          <FaHome className="mr-2" />
          Overview
        </a>
        <a href="#" className="flex items-center font-bold p-2 rounded-full" style={{backgroundColor: "#01F0D0"}}>
          <FaUserFriends className="mr-2" />
          Patients
        </a>
        <a href="#" className="flex items-center hover:text-cyan-600 p-2">
          <FaCalendarAlt className="mr-2" />
          Schedule
        </a>
        <a href="#" className="flex items-center hover:text-cyan-600 p-2">
          <FaEnvelope className="mr-2" />
          Message
        </a>
        <a href="#" className="flex items-center hover:text-cyan-600 p-2">
          <FaCreditCard className="mr-2" />
          Transactions
        </a>
      </nav>

      {/* Profile Section */}
      <div className="hidden md:flex items-center space-x-4 text-gray-600 mt-4 md:mt-0">
        <img
          src={DoctorPhoto}
          alt="Dr. Jose Simmons"
          className="w-10 h-10 rounded-full"
        />
        <div className="text-center md:text-left">
          <span className="block font-semibold text-sm">Dr. Jose Simmons</span>
          <small className="text-xs">General Practitioner</small>
        </div>
        <FaCog className="hidden md:block cursor-pointer" />
        <FaEllipsisV className="hidden md:block cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;
