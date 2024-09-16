import React, { useState, useEffect } from 'react';
import StudentCard from './StudentCard';
import './App.css';

const StudentList = () => {
    const [studentsList, setStudentsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/students');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Fetched students:', data); // Log the fetched data
                setStudentsList(data);
            } catch (error) {
                console.log(error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchStudents();
    }, []);

    return (
        <div className="student-list">
            <h1>Students List</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {studentsList && studentsList.length > 0 ? (
                studentsList.map((student, index) => (
                    <StudentCard key={index} student={student} />
                ))
            ) : (
                <p>No students available</p>
            )}
        </div>
    );
};

export default StudentList;
