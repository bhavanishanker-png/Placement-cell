import React, { useState } from "react";
import "./Interview.css"; // Importing the CSS file
const backendURL = "https://server-placement.vercel.app" || 'http://localhost:5001';
const AddInterview = () => {
  const [company, setCompany] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
//   console.log(date)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form data to be sent to the backend
    const interviewData = { company, date };

    fetch(`${backendURL}/api/interviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(interviewData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Interview added successfully") {
          setMessage("Interview added successfully!");
          setCompany("");
          setDate("");
        } else {
          setMessage("Failed to add interview.");
        }
      })
      .catch((error) => {
        setMessage("Error: " + error.message);
      });
  };

  return (
    <div className="form-container">
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <h1>Add an Interview</h1>
      </div>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group1">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Enter company name"
            required
          />
        </div>
        <div className="form-group1">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Add Interview
        </button>
      </form>
    </div>
  );
};

export default AddInterview;
