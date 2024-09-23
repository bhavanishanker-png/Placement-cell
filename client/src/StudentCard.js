import React, { useState } from 'react';
import axios from 'axios';

const backendURL = "https://server-placement.vercel.app" || 'http://localhost:5001';

const StudentCard = ({ student, refreshStudents }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editedStudent, setEditedStudent] = useState({ ...student });

    const toggleDetails = () => {
        setIsOpen(!isOpen);
    };

    const handleInputChange = (e) => {
        setEditedStudent({ ...editedStudent, [e.target.name]: e.target.value });
    };

    const handleDeleteStudent = () => {
        axios
            .delete(`${backendURL}/api/students/${student.id}`)
            .then(() => {
                refreshStudents();
            })
            .catch((error) => {
                console.error("Error deleting student:", error);
            });
    };

    const handleEditStudent = () => {
        axios
            .put(`${backendURL}/api/students/${student.id}`, editedStudent)
            .then(() => {
                setEditMode(false);
                refreshStudents();
            })
            .catch((error) => {
                console.error("Error updating student:", error);
            });
    };

    return (
        <div className="border border-gray-300 rounded-lg mb-4 w-full">
            <div className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer" onClick={toggleDetails}>
                <h3 className="text-lg font-semibold">{student.name}</h3>
                <span className="text-lg">{isOpen ? "▲" : "▼"}</span>
            </div>

            {isOpen && (
                <div className="p-4">
                  <div className='bg-gray-100 p-4 rounded-lg mt-2'>
                    <div className="mb-4">
                        <img
                            className="w-24 h-24 rounded-full"
                            src={`https://avatars.dicebear.com/api/adventurer/${student.id}.svg`}
                            alt="Student Avatar"
                        />
                    </div>
                    {editMode ? (
                        <>
                            <input
                                type="text"
                                name="name"
                                value={editedStudent.name}
                                onChange={handleInputChange}
                                className="border rounded p-2 mb-3 w-full"
                            />
                            <button onClick={handleEditStudent} className="bg-blue-500 text-white rounded px-3 py-2">Save</button>
                        </>
                    ) : (
                        <>
                            <p><strong>Name:</strong> {student.name}</p>
                            <p><strong>Age:</strong> {student.age}</p>
                            <p><strong>Gender:</strong> {student.gender}</p>
                            <p><strong>College:</strong> {student.college}</p>
                            <p><strong>Batch:</strong> {student.batch}</p>
                            <p><strong>Status:</strong> {student.status}</p>
                            <p><strong>DSA Score:</strong> {student.dsaScore}</p>
                            <p><strong>React Score:</strong> {student.reactScore}</p>
                            <p><strong>Web Development Score:</strong> {student.webdScore}</p>
                        </>
                    )}
                    <div className="flex justify-between mt-4">
                        {editMode ? (
                            <button onClick={() => setEditMode(false)} className="bg-gray-300 rounded px-3 py-2">Cancel</button>
                        ) : (
                            <button onClick={() => setEditMode(true)} className="bg-yellow-500 text-white rounded px-3 py-2">Edit</button>
                        )}
                        <button onClick={handleDeleteStudent} className="bg-red-500 text-white rounded px-3 py-2">Delete</button>
                    </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentCard;
