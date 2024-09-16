import React from 'react';
import './Interview.css'; // Importing the CSS file

const InterviewCard = ({ interview, students }) => {
    return (
        <div className="interview-card">
            <h2>Interview Details</h2>
            <p><strong>Company:</strong> {interview.companyName}</p>
            <p><strong>Date:</strong> {interview.date}</p>

            <h3>Enrolled Students</h3>
            {students.length > 0 ? (
                students.map((student, index) => (
                    <div className="student-row" key={index}>
                        <p><strong>Name:</strong> {student.name}</p>
                        <p><strong>Email:</strong> {student.email}</p>
                        <p><strong>Result:</strong> {student.result}</p>
                        <button className="delete-btn">Delete</button>
                    </div>
                ))
            ) : (
                <p>No students enrolled</p>
            )}
        </div>
    );
};

export default InterviewCard;
