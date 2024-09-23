import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job, applyLink }) => {
  return (
    <div className="job-card bg-white shadow-lg rounded-lg p-4 mb-4 flex flex-col sm:flex-row items-start">
      <img src={job.logo} alt={job.company} className="job-logo h-16 w-16 object-contain mb-4 sm:mb-0 sm:mr-4" />
      <div className="job-details flex-1">
        <h2 className="text-lg font-semibold">{job.title}</h2>
        <h3 className="text-md text-gray-700">{job.company}</h3>
        <p><strong>Job Type:</strong> {job.type}</p>
        <p><strong>Application Publication:</strong> {new Date(job.date).toLocaleString()}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Salary:</strong> {job.salary}</p>
      </div>
      <Link to={applyLink} className="mt-4 sm:mt-0 sm:ml-4">
        <button className="bg-green-900 text-white py-2 px-4 rounded hover:bg-green-900 transition duration-300">
          Apply
        </button>
      </Link>
    </div>
  );
};

export default JobCard;
