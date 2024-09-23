import React, { useState } from 'react';

const backendURL = "https://server-placement.vercel.app" || 'http://localhost:5001';

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
        console.log('Form data:', formData);
        try {
            const response = await fetch(`${backendURL}/api/students`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([formData])  // This sends a single student object
            });

            const result = await response.json();
            console.log(result);
            if (response.ok) {
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
            } else {
                alert(result.message || 'Failed to add student');
            }
        } catch (error) {
            console.error('Error adding student:', error);
            alert('Failed to add student');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xl">{/* Increased width here */}
                <h2 className="text-2xl font-bold mb-4 text-center">Add New Student</h2>
                <form onSubmit={handleSubmit}>
                    {Object.entries(formData).map(([key, value]) => (
                        <div key={key} className="mb-4">
                            <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </label>
                            {key === 'gender' || key === 'batch' ? (
                                <select
                                    id={key}
                                    name={key}
                                    value={value}
                                    onChange={handleChange}
                                    required
                                    className="block w-full p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="" disabled>Select {key.charAt(0).toUpperCase() + key.slice(1)}</option>
                                    {key === 'gender' ? (
                                        <>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </>
                                    ) : (
                                        <>
                                            <option value={2023}>2023</option>
                                            <option value={2024}>2024</option>
                                        </>
                                    )}
                                </select>
                            ) : (
                                <input
                                    type={key.includes('Score') || key === 'age' ? 'number' : 'text'}
                                    id={key}
                                    name={key}
                                    value={value}
                                    onChange={handleChange}
                                    placeholder={`Enter ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                                    required
                                    className="block w-full p-2 border border-gray-300 rounded-md"
                                />
                            )}
                        </div>
                    ))}
                    <button type="submit" className="w-full bg-green-900 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
                        Add Student
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddStudentForm;
