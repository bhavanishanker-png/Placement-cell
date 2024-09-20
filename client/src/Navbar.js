import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBriefcase, faUser, faDownload, faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h1 className="navbar-title">Newton School</h1>
            </div>
            <div className="navbar-right">
                <ul className={`navbar-links ${isMobileMenuOpen ? 'open' : ''}`}>
                    <li><a href="dashboard"><FontAwesomeIcon icon={faHome} /> Dashboard</a></li>
                    <li><a href="Add-student"><FontAwesomeIcon icon={faUser} /> Add new Student</a></li>
                    <li><a href="Add-Interview"><FontAwesomeIcon icon={faUser} /> Add new Interview</a></li>
                    <li><a href="job-portal"><FontAwesomeIcon icon={faBriefcase} /> Job Portal</a></li>
                    <li><Link to="signin" className="logout-btn"><FontAwesomeIcon icon={faSignOutAlt} /> Logout</Link></li>
                </ul>
                <div className="hamburger" onClick={toggleMobileMenu}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
