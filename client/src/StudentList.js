import React, { useEffect, useState } from 'react';
import StudentCard from './StudentCard';

const backendURL = "https://server-placement.vercel.app";

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
        <div className="w-full max-w-6xl mx-auto p-6 bg-gray-50 border border-gray-300 shadow-md rounded-lg">
            <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">Students List</h1>
            {loading && <p className="text-center text-lg font-semibold text-blue-600">Loading...</p>}
            {error && <p className="text-center text-lg font-semibold text-red-500">Error: {error}</p>}
            {!loading && studentsList.length === 0 && <p className="text-center text-lg font-semibold text-gray-500">No students available</p>}
            
            <div className="grid grid-cols-1gap-6">
                {studentsList.length > 0 && studentsList.map((student) => (
                    <StudentCard key={student.id} student={student} refreshStudents={fetchStudents} />
                ))}
            </div>
        </div>
    );
};

export default StudentList;
