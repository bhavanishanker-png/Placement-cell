import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backendURL =
  "https://server-placement.vercel.app" || "http://localhost:5001";

const InterviewCard = ({ interview,refreshInterviews }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedInterview, setEditedInterview] = useState({ ...interview });
  const navigate = useNavigate();

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setEditedInterview({ ...editedInterview, [e.target.name]: e.target.value });
  };

  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const handleDeleteInterview = async () => {
    const token = getToken();
    if (!token) {
        alert("Please log in to delete an interview.");
        navigate("/signin");
        return;
    }

    try {
        axios.delete(`${backendURL}/api/interviews/${interview.id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        alert("Interview deleted successfully!");
        refreshInterviews();
    } catch (error) {
        console.error("Error deleting interview:", error);
        alert("Failed to delete interview. Please try again.");
    }
};

const handleEditInterview = async () => {
    const token = getToken();
    if (!token) {
        alert("Please log in to edit interview details.");
        navigate("/login");
        return;
    }

    try {
        axios.put(`${backendURL}/api/interviews/${interview.id}`, editedInterview, {
            headers: { Authorization: `Bearer ${token}` },
        })
        setEditMode(false);
        alert("Interview updated successfully!");
        refreshInterviews();
    } catch (error) {
        console.error("Error updating interview:", error);
        alert("Failed to update interview. Please try again.");
    }
};


  // Check if the card should be open based on expandAll state

  return (<div className="border border-green-300 rounded-lg mb-6 w-full shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out bg-white">
    <div
      className="flex justify-between items-center p-4 bg-green-500 cursor-pointer rounded-t-lg text-white"
      onClick={toggleDetails}
    >
      <h3 className="text-xl font-semibold">{interview.companyName}</h3>
      <span className="text-xl font-bold">{isOpen ? "▲" : "▼"}</span>
    </div>
  
    {isOpen && (
      <div className="p-4 border-t border-green-200 bg-green-50 transition-all duration-500 ease-in-out">
        <div className="p-4 rounded-lg mt-2">
          {/* Add an avatar or logo here if applicable */}
          <div className="mb-4">
            <p className="text-lg font-semibold">Interview Details:</p>
            {/* <p className="text-sm text-gray-600">Click to edit details below</p> */}
          </div>
  
          {editMode ? (
            <>
              {/* Edit form fields */}
              {["companyName", "interviewDate", "position", "status"].map((field, index) => (
                <div key={index} className="mb-6">
                  <label
                    htmlFor={field}
                    className="block mb-2 font-semibold text-gray-800"
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === "interviewDate" ? "date" : "text"}
                    name={field}
                    id={field} // Added id for accessibility
                    value={editedInterview[field]}
                    onChange={handleInputChange}
                    className="border border-green-400 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-600 transition duration-200"
                    placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                    required // Added required attribute for basic validation
                  />
                </div>
              ))}
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleEditInterview}
                  className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-5 py-2 transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white rounded-lg px-5 py-2 transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <div className="text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex justify-between items-center p-2 border-b border-gray-300">
                <strong className="text-gray-900">Company Name:</strong>
                <span>{interview.companyName}</span>
              </div>
              <div className="flex justify-between items-center p-2 border-b border-gray-300">
              <strong className="text-gray-900">Interview Date:</strong>
               <span>{new Date(interview.date).toLocaleDateString()}</span>
              </div>
              {/* <div className="flex justify-between items-center p-2 border-b border-gray-300">
                <strong className="text-gray-900">Position:</strong>
                <span>{interview.position}</span>
              </div>
              <div className="flex justify-between items-center p-2 border-b border-gray-300">
                <strong className="text-gray-900">Status:</strong>
                <span>{interview.status}</span>
              </div> */}
            </div>
          )}
  
          <div className="flex justify-between mt-6">
            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg px-4 py-2 transition-colors duration-300"
              >
                Edit
              </button>
            )}
            <button
              onClick={handleDeleteInterview}
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

export default InterviewCard;
