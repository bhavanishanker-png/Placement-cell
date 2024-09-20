import React, { useEffect, useState } from 'react';
import './Interview.css'; // Importing the CSS file
import InterviewCard from './InterviewCard'; // Importing InterviewCard component
const backendURL = "https://server-placement.vercel.app" || 'http://localhost:5001';
const ScheduledInterviews = () => {
    const [interviews, setInterviews] = useState([]); // Store multiple interviews
    const [expandedInterviewIndex, setExpandedInterviewIndex] = useState(null); // Track the expanded interview
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the interview and students data from the API
    useEffect(() => {
        const fetchInterviewData = async () => {
            try {
                const response = await fetch(`${backendURL}/api/interviews`);
                if (!response.ok) throw new Error('Network response was not ok');
                
                const data = await response.json();
                setInterviews(data); // Assuming your API returns an array of interviews
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchInterviewData();
    }, []);

    const handleCompanyClick = (index) => {
        // Toggle the display of the interview details
        setExpandedInterviewIndex(expandedInterviewIndex === index ? null : index);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="interview-container">
            <h1>Scheduled Interviews</h1>

            {/* Display list of companies */}
            {interviews.map((interview, index) => (
                <div key={index} className="interview-card">
                    <div 
                        className="company-name" 
                        onClick={() => handleCompanyClick(index)} // When a company is clicked, show its details
                    >
                        <h3 >
                            {interview.companyName}
                            
                        </h3>
                        <span className="toggle-icon">
                                {expandedInterviewIndex === index ? '▲' : '▼'}
                            </span>
                    </div>

                    {/* Conditionally render the selected company's details */}
                    {expandedInterviewIndex === index && (
                        <InterviewCard 
                            interview={interview} 
                            students={interview.students} 
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default ScheduledInterviews;
