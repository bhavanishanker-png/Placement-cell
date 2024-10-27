import React, { useState } from "react";
import axios from "axios";

const backendURL =
  "https://server-placement.vercel.app";

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
    <div className="border border-gray-200 rounded-lg mb-6 w-full shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <div
        className="flex justify-between items-center p-4 bg-gradient-to-r cursor-pointer rounded-t-lg"
        onClick={toggleDetails}
      >
        <h3 className="text-xl font-semibold">{student.name}</h3>
        <span className="text-xl font-bold">{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <div className="p-4 border-t border-gray-300 bg-gray transition-all duration-500 ease-in-out">
          <div className="bg-gray-100 p-4 rounded-lg mt-2">
            <div className="flex items-center mb-4">
              <img
                className="w-24 h-24 rounded-full mr-4"
                src={`https://avatars.dicebear.com/api/adventurer/${student.id}.svg`}
                alt="Student Avatar"
              />
              <div>
                <p className="text-lg font-semibold">Details:</p>
                <p className="text-sm text-gray-600">Click to edit details below</p>
              </div>
            </div>

            {editMode ? (
              <>
                <label className="block mb-2 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editedStudent.name}
                  onChange={handleInputChange}
                  className="border rounded-lg p-2 mb-4 w-full"
                  placeholder="Name"
                />
                <label className="block mb-2 font-medium">Age</label>
                <input
                  type="number"
                  name="age"
                  value={editedStudent.age}
                  onChange={handleInputChange}
                  className="border rounded-lg p-2 mb-4 w-full"
                  placeholder="Age"
                />
                <label className="block mb-2 font-medium">Gender</label>
                <input
                  type="text"
                  name="gender"
                  value={editedStudent.gender}
                  onChange={handleInputChange}
                  className="border rounded-lg p-2 mb-4 w-full"
                  placeholder="Gender"
                />
                <label className="block mb-2 font-medium">College</label>
                <input
                  type="text"
                  name="college"
                  value={editedStudent.college}
                  onChange={handleInputChange}
                  className="border rounded-lg p-2 mb-4 w-full"
                  placeholder="College"
                />
                <label className="block mb-2 font-medium">Batch</label>
                <input
                  type="text"
                  name="batch"
                  value={editedStudent.batch}
                  onChange={handleInputChange}
                  className="border rounded-lg p-2 mb-4 w-full"
                  placeholder="Batch"
                />
                <label className="block mb-2 font-medium">DSA Score</label>
                <input
                  type="number"
                  name="dsaScore"
                  value={editedStudent.dsaScore}
                  onChange={handleInputChange}
                  className="border rounded-lg p-2 mb-4 w-full"
                  placeholder="DSA Score"
                />
                <label className="block mb-2 font-medium">React Score</label>
                <input
                  type="number"
                  name="ReactScore"
                  value={editedStudent.reactScore}
                  onChange={handleInputChange}
                  className="border rounded-lg p-2 mb-4 w-full"
                  placeholder="React Score"
                />
                <label className="block mb-2 font-medium">Web Dev Score</label>
                <input
                  type="number"
                  name="WebdScore"
                  value={editedStudent.webdScore}
                  onChange={handleInputChange}
                  className="border rounded-lg p-2 mb-4 w-full"
                  placeholder="Web Development Score"
                />
                <div className="flex justify-between mt-4">
                  <button
                    onClick={handleEditStudent}
                    className="bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2 transition-colors duration-300"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="bg-gray-400 hover:bg-gray-500 text-white rounded-lg px-4 py-2 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <div className="text-gray-700">
                <p className="mb-2">
                  <strong>Name:</strong> {student.name}
                </p>
                <p className="mb-2">
                  <strong>Age:</strong> {student.age}
                </p>
                <p className="mb-2">
                  <strong>Gender:</strong> {student.gender}
                </p>
                <p className="mb-2">
                  <strong>College:</strong> {student.college}
                </p>
                <p className="mb-2">
                  <strong>Batch:</strong> {student.batch}
                </p>
                <p className="mb-2">
                  <strong>DSA Score:</strong> {student.dsaScore}
                </p>
                <p className="mb-2">
                  <strong>React Score:</strong> {student.reactScore}
                </p>
                <p className="mb-2">
                  <strong>Web Dev Score:</strong> {student.webdScore}
                </p>
              </div>
            )}

            <div className="flex justify-between mt-6">
              {editMode ? null : (
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg px-4 py-2 transition-colors duration-300"
                >
                  Edit
                </button>
              )}
              <button
                onClick={handleDeleteStudent}
                className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 transition-colors duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentCard;
