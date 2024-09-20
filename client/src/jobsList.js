import React, { useEffect, useState } from "react";
import JobCard from './jobCard';
import slack from  './assets/slack.svg';
import apple from './assets/apple.avif';
import zoom from './assets/zoom.webp';
import asana from './assets/asana.png';
const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${backendURL}/api/jobs`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setJobs(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching jobs:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const logos = [
    slack,
    apple,
    zoom,
    asana
  ];
  const applyLinks=["https://slack.com/intl/en-in/careers",'https://jobs.apple.com/en-in/details/200566914/senior-digital-support-strategy-program-manager?team=SFTWR',"https://careers.zoom.us/","https://asana.com/id/jobs/all"]
  // Create a new array with job logos assigned
  const jobsWithLogos = jobs.map((job, index) => ({
    ...job,
    logo: logos[index % logos.length] // Use modulo to avoid out-of-bounds errors
  }));

  if (loading) {
    return <p>Loading jobs...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className="job-list" style={{ width: "800px" }}>
        {jobsWithLogos.length === 0 ? (
          <p>No jobs available at the moment.</p>
        ) : (
          jobsWithLogos.map((job,i) => <JobCard key={job.id} job={job} applyLink={applyLinks[i]}/>)
        )}
      </div>
    </div>
  );
};

export default JobList;
