import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBriefcase, faUser, faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { loginState, setLoginState } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setLoginState(false); // Adjust as needed for your authentication logic
        navigate("/signin"); // Redirect to sign-in after logout
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar flex flex-col bg-custom-green p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-bold">
                    <Link to="/">
                        <button className="cursor-pointer">Newton<span className="text-red-500">School</span></button>
                    </Link>
                </div>
                <div className={`navbar-links hidden md:flex items-center space-x-6`}>
                    <ul className="flex space-x-6">
                        <li className='text-white-100'><Link to="/dashboard"><FontAwesomeIcon icon={faHome} /> Dashboard</Link></li>
                        <li className='text-white-100'><Link to="/add-student"><FontAwesomeIcon icon={faUser} /> Add New Student</Link></li>
                        <li className='text-white-100'><Link to="/add-interview"><FontAwesomeIcon icon={faUser} /> Add New Interview</Link></li>
                        <li className='text-white-100'><Link to="/job-portal"><FontAwesomeIcon icon={faBriefcase} /> Job Portal</Link></li>
                        {loginState ? (
                            <li>
                                <button onClick={handleLogout} className="logout-btn">
                                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                                </button>
                            </li>
                        ) : (
                            <li><Link to="/signin" className="logout-btn"><FontAwesomeIcon icon={faSignOutAlt} /> Sign In</Link></li>
                        )}
                    </ul>
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="focus:outline-none">
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden flex items-start">
                    <ul className="flex flex-col space-y-2">
                        <li className='text-white-100'><Link to="/dashboard"><FontAwesomeIcon icon={faHome} /> Dashboard</Link></li>
                        <li className='text-white-100'><Link to="/add-student"><FontAwesomeIcon icon={faUser} /> Add New Student</Link></li>
                        <li className='text-white-100'><Link to="/add-interview"><FontAwesomeIcon icon={faUser} /> Add New Interview</Link></li>
                        <li className='text-white-100'><Link to="/job-portal"><FontAwesomeIcon icon={faBriefcase} /> Job Portal</Link></li>
                        {loginState ? (
                            <li><button onClick={handleLogout} className="logout-btn"><FontAwesomeIcon icon={faSignOutAlt} /> Logout</button></li>
                        ) : (
                            <li><Link to="/signin" className="logout-btn"><FontAwesomeIcon icon={faSignOutAlt} /> Sign In</Link></li>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
