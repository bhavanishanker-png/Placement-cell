import React, { useState } from "react";
import axios from "axios";

const backendURL = "https://server-placement.vercel.app" || 'http://localhost:5001';

function StudentCard({ student, refreshStudents }) {
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
        refreshStudents(); // Ensure this function is updating the state in StudentList
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
        refreshStudents(); // Ensure this function is updating the state in StudentList
      })
      .catch((error) => {
        console.error("Error updating student:", error);
      });
  };

  return (
    <div className="student-card">
      <div className="student-header" onClick={toggleDetails}>
        <h3>{student.name}</h3>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <div className="student-info">
          <div className="student-photo">
            <img
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              src={`https://avatars.dicebear.com/api/adventurer/${student.id}.svg`}
              alt="Student Avatar"
            />
          </div>
          <div className="student-details">
            {editMode ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={editedStudent.name}
                  onChange={handleInputChange}
                />
                {/* Add similar input fields for other student properties */}
                <button onClick={handleEditStudent}>Save</button>
              </>
            ) : (
              <>
                <p><b>Name: </b>{student.name}</p>
                <p><b>Age:</b> {student.age}</p>
                <p><b>Gender:</b> {student.gender}</p>
                <p><b>College:</b> {student.college}</p>
                <p><b>Batch:</b> {student.batch}</p>
                <p><b>Status:</b> {student.status}</p>
                <p><b>DSA Score:</b> {student.dsaScore}</p>
                <p><b>React Score:</b> {student.reactScore}</p>
                <p><b>Web Development Score:</b> {student.webdScore}</p>
              </>
            )}
          </div>
          <div>
            {editMode ? (
              <button onClick={() => setEditMode(false)}>Cancel</button>
            ) : (
              <button onClick={() => setEditMode(true)}>Edit</button>
            )}
            <button onClick={handleDeleteStudent}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentCard;
