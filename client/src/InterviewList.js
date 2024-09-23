import React, { useEffect, useState } from 'react';
import InterviewCard from './InterviewCard';

const backendURL = "https://server-placement.vercel.app" || 'http://localhost:5001';

const ScheduledInterviews = () => {
    const [interviews, setInterviews] = useState([]);
    const [expandedInterviewIndex, setExpandedInterviewIndex] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInterviewData = async () => {
            try {
                const response = await fetch(`${backendURL}/api/interviews`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setInterviews(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchInterviewData();
    }, []);

    const handleCompanyClick = (index) => {
        setExpandedInterviewIndex(expandedInterviewIndex === index ? null : index);
    };

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="w-full max-w-6xl mx-auto p-6 border border-gray-600 rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">Scheduled Interviews</h1>

            {interviews.map((interview, index) => (
                <div key={index} className="border border-gray-300 rounded-lg mb-4 w-full">
                    <div
                        className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer"
                        onClick={() => handleCompanyClick(index)}
                    >
                        <h3 className="text-lg font-semibold">{interview.companyName}</h3>
                        <span className="text-xl">
                            {expandedInterviewIndex === index ? '▲' : '▼'}
                        </span>
                    </div>

                    {expandedInterviewIndex === index && (
                        <div className="p-4">
                            <InterviewCard interview={interview} students={interview.students} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ScheduledInterviews;
