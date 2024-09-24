import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBriefcase, faUser, faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { loginState, setLoginState } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const savedLoginState = localStorage.getItem('isLoggedIn');
    if (savedLoginState) {
      setLoginState(true);
    }
  }, [setLoginState]);

  const handleLogout = () => {
    setLoginState(false);
    localStorage.removeItem('isLoggedIn');
    navigate("/signin");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);  // Toggle mobile menu
  };

  return (
    <nav className="navbar flex flex-col bg-custom-green p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link to="/">
            <button className="cursor-pointer">Newton<span className="text-red-500">School</span></button>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6">
            <li className="text-white">
              <Link to="/dashboard">
                <FontAwesomeIcon icon={faHome} /> Dashboard
              </Link>
            </li>
            <li className="text-white">
              <Link to="/add-student">
                <FontAwesomeIcon icon={faUser} /> Add New Student
              </Link>
            </li>
            <li className="text-white">
              <Link to="/add-interview">
                <FontAwesomeIcon icon={faUser} /> Add New Interview
              </Link>
            </li>
            <li className="text-white">
              <Link to="/job-portal">
                <FontAwesomeIcon icon={faBriefcase} /> Job Portal
              </Link>
            </li>
            {loginState ? (
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </button>
              </li>
            ) : (
              <li>
                <Link to="/signin" className="logout-btn">
                  <FontAwesomeIcon icon={faSignOutAlt} /> Sign In
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-start mt-2">
          <ul className="flex flex-col space-y-2">
            <li className="text-white">
              <Link to="/dashboard">
                <FontAwesomeIcon icon={faHome} /> Dashboard
              </Link>
            </li>
            <li className="text-white">
              <Link to="/add-student">
                <FontAwesomeIcon icon={faUser} /> Add New Student
              </Link>
            </li>
            <li className="text-white">
              <Link to="/add-interview">
                <FontAwesomeIcon icon={faUser} /> Add New Interview
              </Link>
            </li>
            <li className="text-white">
              <Link to="/job-portal">
                <FontAwesomeIcon icon={faBriefcase} /> Job Portal
              </Link>
            </li>
            {loginState ? (
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </button>
              </li>
            ) : (
              <li>
                <Link to="/signin" className="logout-btn">
                  <FontAwesomeIcon icon={faSignOutAlt} /> Sign In
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
