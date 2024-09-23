import React, { useEffect, useState } from 'react';
import StudentCard from './StudentCard';

const backendURL = "https://server-placement.vercel.app" || 'http://localhost:5001';

const StudentList = () => {
    const [studentsList, setStudentsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStudents = async () => {
        try {
            const response = await fetch(`${backendURL}/api/students`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setStudentsList(data);
        } catch (error) {
            console.error('Error fetching students:', error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <div className="w-full max-w-6xl mx-auto p-6 border border-gray-600 rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">Students List</h1>
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center text-red-500">Error: {error}</p>}

                {studentsList.length > 0 ? (
                    studentsList.map((student) => (
                        <StudentCard key={student.id} student={student} refreshStudents={fetchStudents} />
                    ))
                ) : (
                    <p className="text-center">No students available</p>
                )}

        </div>
    );
};

export default StudentList;
