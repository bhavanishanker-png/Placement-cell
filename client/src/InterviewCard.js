import React from 'react';

const InterviewCard = ({ interview, students }) => {
    return (
        <div className="bg-gray-100 p-4 rounded-lg mt-2">
            <h2 className="text-xl font-bold mb-2">Interview Details</h2>
            <p className="mb-1"><strong>Company:</strong> {interview.companyName}</p>
            <p className="mb-4"><strong>Date:</strong> {interview.date}</p>

            <h3 className="text-lg font-semibold mb-1">Enrolled Students</h3>
            {students.length > 0 ? (
                students.map((student, index) => (
                    <div className="flex justify-between items-center border-b py-2" key={index}>
                        <p className="flex-1"><strong>Name:</strong> {student.name}</p>
                    </div>
                ))
            ) : (
                <p>No students enrolled</p>
            )}
        </div>
    );
};

export default InterviewCard;
