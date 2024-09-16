import React, { useState } from 'react';
import './App.css';

const AddStudentForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        college: '',
        batch: '',
        status: 'Not Placed',
        dsaScore: '',
        reactScore: '',
        webdScore: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send student data to the back-end API
            const response = await fetch('http://localhost:5001/api/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                // Reset the form
                setFormData({
                    name: '',
                    age: '',
                    gender: '',
                    college: '',
                    batch: '',
                    status: 'Not Placed',
                    dsaScore: '',
                    reactScore: '',
                    webdScore: ''
                });
                alert('Student added successfully!');
                // Optionally, trigger a refetch or refresh of the student list
                // You might need to use state or a context to manage this
            } else {
                alert(result.message || 'Failed to add student');
            }
        } catch (error) {
            console.error('Error adding student:', error);
            alert('Failed to add student');
        }
    };

    return (
        <div className="abc">
            <div className="form-container">
                <h2>ADD NEW STUDENT</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <div className="inputBox">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter Name"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <div className="inputBox">
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                placeholder="Enter Age"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Gender</label>
                        <div className="selectBox">
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="college">College</label>
                        <div className="inputBox">
                            <input
                                type="text"
                                id="college"
                                name="college"
                                value={formData.college}
                                onChange={handleChange}
                                placeholder="Enter College"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="batch">Batch</label>
                        <div className="selectBox">
                            <select
                                id="batch"
                                name="batch"
                                value={formData.batch}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select One Batch</option>
                                <option value="batch1">Batch 1</option>
                                <option value="batch2">Batch 2</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dsaScore">DSA Score</label>
                        <div className="inputBox">
                            <input
                                type="number"
                                id="dsaScore"
                                name="dsaScore"
                                value={formData.dsaScore}
                                onChange={handleChange}
                                placeholder="Marks Out of 30"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="reactScore">React Score</label>
                        <div className="inputBox">
                            <input
                                type="number"
                                id="reactScore"
                                name="reactScore"
                                value={formData.reactScore}
                                onChange={handleChange}
                                placeholder="Marks Out of 30"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="webdScore">WebD Score</label>
                        <div className="inputBox">
                            <input
                                type="number"
                                id="webdScore"
                                name="webdScore"
                                value={formData.webdScore}
                                onChange={handleChange}
                                placeholder="Marks Out of 30"
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="submit-btn">Add Student</button>
                </form>
            </div>
        </div>
    );
};

export default AddStudentForm;
