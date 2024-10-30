
import React, { useEffect, useState } from 'react';
import InterviewCard from './InterviewCard';

const backendURL = "https://server-placement.vercel.app" || 'http://localhost:5001';

const ScheduledInterviews = () => {
    const [interviews, setInterviews] = useState([]);
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

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="w-full max-w-6xl mx-auto p-6 bg-green-50 border border-green-300 shadow-md rounded-lg">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-green-700">Scheduled Interviews</h1>
    

        {loading && <p className="text-center text-lg font-semibold text-blue-600">Loading...</p>}
        

        {error && <p className="text-center text-lg font-semibold text-red-500">Error: {error}</p>}
        

        {!loading && interviews.length === 0 && <p className="text-center text-lg font-semibold text-gray-500">No interviews scheduled</p>}
        
        <div className="grid grid-cols-1 gap-6">
            {interviews.length > 0 && interviews.map((interview) => (
                <InterviewCard
                    key={interview.id} 
                    interview={interview} 
                />
            ))}
        </div>
    </div>
    
    );
};

export default ScheduledInterviews;
