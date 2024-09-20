import React from 'react';
import './jobCard.css'; // Separate CSS file for styling
import {Link} from 'react-router-dom';
const JobCard = ({ job ,applyLink}) => {
    // logos=["/Users/bhavanishanker/Desktop/Placement-cell/client/src/assets/apple.avif"]
    return (
        <div className="job-card">
            <img src={job.logo} alt={job.company} className="job-logo" />
            <div className="job-details">
                <h2>{job.title}</h2>
                <h3>{job.company}</h3>
                <p><strong>JobType:</strong> {job.type}</p>
                <p><strong>Application Publication:</strong> {new Date(job.date).toLocaleString()}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Salary:</strong> {job.salary}</p>
            </div>
            <Link  to={applyLink}><button>Apply</button></Link>
        </div>
    );
};

export default JobCard;
