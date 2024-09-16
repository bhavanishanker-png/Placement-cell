import React, { useState } from "react";
import "./App.css";

// Individual student card
function StudentCard({ student }) {
  const [isOpen, setIsOpen] = useState(false); // State to toggle visibility

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  const handleDeleteInterview = (interviewId) => {
    console.log("Deleting interview with ID:", interviewId);
    // Add logic to delete interview
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
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
              }}
              src={`https://avatars.dicebear.com/api/adventurer/${student.id}.svg`}
              alt="Student Avatar"
            />
          </div>
          <div className="student-details">
          <p><b>Name: </b> {student.name}</p>
            <p><b>Age:</b> {student.age}</p>
            <p><b>Gender:</b> {student.gender}</p>
            <p><b>College:</b> {student.college}</p>
            <p><b>Batch:</b> {student.batch}</p>
            <p><b>Status:</b> {student.status}</p>
            <p><b>DSA Score:</b> {student.dsaScore}</p>
            <p><b>React Score:</b> {student.reactScore}</p>
            <p><b>Web Development Score:</b> {student.webdScore}</p>
          </div>
          <div>
            <button>Edit</button>
            <button>Delete</button>
          </div>
          {/* Interviews Table */}
          <div className="interviews">
            <h4>Interviews</h4>
            <table>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Date</th>
                  <th>Result</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {student.interviews && student.interviews.length > 0 ? (
                  student.interviews.map((interview) => (
                    <tr key={interview.id}>
                      <td>{interview.company}</td>
                      <td>{interview.date}</td>
                      <td>{interview.result}</td>
                      <td>
                        <button onClick={() => handleDeleteInterview(interview.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No interviews available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentCard;
