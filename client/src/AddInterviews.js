import React, { useState, useEffect } from "react";

const backendURL = "https://server-placement.vercel.app" || 'http://localhost:5001';

const AddInterview = () => {
  const [company, setCompany] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [existingInterviews, setExistingInterviews] = useState([]);

  useEffect(() => {
    // Fetch existing interviews
    const fetchInterviews = async () => {
      try {
        const response = await fetch(`${backendURL}/api/interviews`);
        const data = await response.json();
        console.log(date)
        setExistingInterviews(data);
      } catch (error) {
        console.error('Error fetching interviews:', error);
      }
    };

    fetchInterviews();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const interviewData = { company, date };
    
    const today = new Date().toISOString().split("T")[0];  
    if (date < today) {
      setMessage("Interview date cannot be in the past.");
      return;
    }
    
    const isDuplicateInterview = existingInterviews.some(
      (interview) => interview.company === company && interview.date === date
    );

    if (isDuplicateInterview) {
      setMessage("This interview already exists.");
      return;
    }

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Add an Interview</h1>

        {message && <p className="text-center text-red-500 mb-4">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <input
              type="text"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Enter company name"
              required
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button type="submit" className="w-full bg-green-900 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
            Add Interview
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddInterview;
