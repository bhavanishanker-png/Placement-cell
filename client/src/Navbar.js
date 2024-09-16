import React from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBriefcase, faUser, faDownload, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h1 className="navbar-title">Newton School</h1>
                <p className="navbar-subtitle">and</p>
                <h1 className="navbar-title">Rishihood University</h1>
            </div>
            <div className="navbar-right">
                <ul className="navbar-links">
                    <li><a href="dashboard"><FontAwesomeIcon icon={faHome} /> Dashboard</a></li>
                    <li><a href="Add-student"><FontAwesomeIcon icon={faUser} />Add new Student</a></li>
                    <li><a href="Add-Interview"><FontAwesomeIcon icon={faUser} />Add new Interview</a></li>
                    <li><a href="job-portal"><FontAwesomeIcon icon={faBriefcase} /> Job Portal</a></li>
                    <li><a href="profile"><FontAwesomeIcon icon={faUser} /> Profile</a></li>
                    <li><a href="download"><FontAwesomeIcon icon={faDownload} /> Download Report</a></li>
                    <li><Link to="signin"className="logout-btn"><FontAwesomeIcon icon={faSignOutAlt} /> Logout</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
