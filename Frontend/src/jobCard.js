import React from 'react';
import './jobCard.css'; // Separate CSS file for styling

const JobCard = ({ job }) => {
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
            <button className="apply-btn">Apply</button>
        </div>
    );
};

export default JobCard;
