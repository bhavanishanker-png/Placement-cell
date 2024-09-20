import React, { useState, useEffect } from 'react';
import StudentCard from './StudentCard';
import './App.css';

const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

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
    }

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <div className="student-list">
            <h1>Students List</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {studentsList.length > 0 ? (
                studentsList.map((student) => (
                    <StudentCard key={student.id} student={student} refreshStudents={fetchStudents} />
                ))
            ) : (
                <p>No students available</p>
            )}
        </div>
    );
};

export default StudentList;
