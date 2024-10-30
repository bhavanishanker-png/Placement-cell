// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const backendURL =
//   "https://server-placement.vercel.app" || "http://localhost:5001";

// const StudentCard = ({ student, refreshStudents }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [editedStudent, setEditedStudent] = useState({ ...student });
//   const navigate = useNavigate();

//   const toggleDetails = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleInputChange = (e) => {
//     setEditedStudent({ ...editedStudent, [e.target.name]: e.target.value });
//   };

//   const getToken = () => {
//     return localStorage.getItem("authToken");
//   };

//   const handleDeleteStudent = () => {
//     const token = getToken();
//     if (!token) {
//       alert("Please log in to delete a student.");
//       navigate("/signin");
//       return;
//     }

//     axios
//       .delete(`${backendURL}/api/students/${student.id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then(() => {
//         refreshStudents();
//       })
//       .catch((error) => {
//         console.error("Error deleting student:", error);
//       });
//   };

//   const handleEditStudent = () => {
//     const token = getToken();
//     if (!token) {
//       alert("Please log in to edit student details.");
//       navigate("/login");
//       return;
//     }

//     axios
//       .put(`${backendURL}/api/students/${student.id}`, editedStudent, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then(() => {
//         setEditMode(false);
//         refreshStudents();
//       })
//       .catch((error) => {
//         console.error("Error updating student:", error);
//       });
//   };

//   return (
//     <div className="border border-gray-200 rounded-lg mb-6 w-full shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
//       <div
//         className="flex justify-between items-center p-4 bg-gradient-to-r cursor-pointer rounded-t-lg"
//         onClick={toggleDetails}
//       >
//         <h3 className="text-xl font-semibold">{student.name}</h3>
//         <span className="text-xl font-bold">{isOpen ? "▲" : "▼"}</span>
//       </div>

//       {isOpen && (
//         <div className="p-4 border-t border-gray-300 bg-gray transition-all duration-500 ease-in-out">
//           <div className="bg-gray-100 p-4 rounded-lg mt-2">
//             <div className="flex items-center mb-4">
//               <img
//                 className="w-24 h-24 rounded-full mr-4"
//                 src={`https://avatars.dicebear.com/api/adventurer/${student.id}.svg`}
//                 alt="Student Avatar"
//               />
//               <div>
//                 <p className="text-lg font-semibold">Details:</p>
//                 <p className="text-sm text-gray-600">Click to edit details below</p>
//               </div>
//             </div>

//             {editMode ? (
//               <>
//                 {/* Edit form fields */}
//                 <label className="block mb-2 font-medium">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={editedStudent.name}
//                   onChange={handleInputChange}
//                   className="border rounded-lg p-2 mb-4 w-full"
//                   placeholder="Name"
//                 />
//                  <label className="block mb-2 font-medium">Age</label>
//                  <input
//                   type="number"
//                   name="age"
//                   value={editedStudent.age}
//                   onChange={handleInputChange}
//                   className="border rounded-lg p-2 mb-4 w-full"
//                   placeholder="Age"
//                 />
//                 <label className="block mb-2 font-medium">Gender</label>
//                <input
//                    type="text"
//                   name="gender"
//                   value={editedStudent.gender}
//                   onChange={handleInputChange}
//                   className="border rounded-lg p-2 mb-4 w-full"
//                   placeholder="Gender"
//                 />
//                 <label className="block mb-2 font-medium">College</label>
//                 <input
//                   type="text"
//                   name="college"
//                   value={editedStudent.college}
//                   onChange={handleInputChange}
//                   className="border rounded-lg p-2 mb-4 w-full"
//                   placeholder="College"
//                 />
//                 <label className="block mb-2 font-medium">Batch</label>
//                 <input
//                   type="text"
//                   name="batch"
//                   value={editedStudent.batch}
//                   onChange={handleInputChange}
//                   className="border rounded-lg p-2 mb-4 w-full"
//                   placeholder="Batch"
//                 />
//                 <label className="block mb-2 font-medium">DSA Score</label>
//                 <input
//                   type="number"
//                   name="dsaScore"
//                   value={editedStudent.dsaScore}
//                   onChange={handleInputChange}
//                   className="border rounded-lg p-2 mb-4 w-full"
//                   placeholder="DSA Score"
//                 />
//                 <label className="block mb-2 font-medium">React Score</label>
//                 <input
//                   type="number"
//                   name="ReactScore"
//                   value={editedStudent.reactScore}
//                   onChange={handleInputChange}
//                   className="border rounded-lg p-2 mb-4 w-full"
//                   placeholder="React Score"
//                 />
//                 <label className="block mb-2 font-medium">Web Dev Score</label>
//                 <input
//                   type="number"
//                   name="WebdScore"
//                   value={editedStudent.webdScore}
//                   onChange={handleInputChange}
//                   className="border rounded-lg p-2 mb-4 w-full"
//                   placeholder="Web Development Score"
//                 />
//                 <div className="flex justify-between mt-4">
//                   <button
//                     onClick={handleEditStudent}
//                     className="bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2 transition-colors duration-300"
//                   >
//                     Save
//                   </button>
//                   <button
//                     onClick={() => setEditMode(false)}
//                     className="bg-gray-400 hover:bg-gray-500 text-white rounded-lg px-4 py-2 transition-colors duration-300"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <div className="text-gray-700">
//                 {/* Display student details */}
//                 <p className="mb-2">
//                   <strong>Name:</strong> {student.name}
//                 </p>

//                  <p className="mb-2">
//                    <strong>Age:</strong> {student.age}
//                  </p>
//                  <p className="mb-2">
//                    <strong>Gender:</strong> {student.gender}
//                  </p>
//                  <p className="mb-2">
//                    <strong>College:</strong> {student.college}
//                  </p>
//                  <p className="mb-2">
//                    <strong>Batch:</strong> {student.batch}
//                  </p>
//                  <p className="mb-2">
//                    <strong>DSA Score:</strong> {student.dsaScore}
//                  </p>
//                  <p className="mb-2">
//                    <strong>React Score:</strong> {student.reactScore}
//                  </p>
//                  <p className="mb-2">
//                    <strong>Web Dev Score:</strong> {student.webdScore}
//                  </p>
//               </div>
//             )}

//             <div className="flex justify-between mt-6">
//               {!editMode && (
//                 <button
//                   onClick={() => setEditMode(true)}
//                   className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg px-4 py-2 transition-colors duration-300"
//                 >
//                   Edit
//                 </button>
//               )}
//               <button
//                 onClick={handleDeleteStudent}
//                 className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 transition-colors duration-300"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentCard;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backendURL =
  "https://server-placement.vercel.app" || "http://localhost:5001";

const StudentCard = ({ student, refreshStudents }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedStudent, setEditedStudent] = useState({ ...student });
  const navigate = useNavigate();

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setEditedStudent({ ...editedStudent, [e.target.name]: e.target.value });
  };

  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const handleDeleteStudent = () => {
    const token = getToken();
    if (!token) {
      alert("Please log in to delete a student.");
      navigate("/signin");
      return;
    }

    axios
      .delete(`${backendURL}/api/students/${student.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        refreshStudents();
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
      });
  };

  const handleEditStudent = () => {
    const token = getToken();
    if (!token) {
      alert("Please log in to edit student details.");
      navigate("/login");
      return;
    }

    axios
      .put(`${backendURL}/api/students/${student.id}`, editedStudent, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setEditMode(false);
        refreshStudents();
      })
      .catch((error) => {
        console.error("Error updating student:", error);
      });
  };

  return (
    <div className="border border-green-300 rounded-lg mb-6 w-full shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out bg-white">
      <div
        className="flex justify-between items-center p-4 bg-green-500 cursor-pointer rounded-t-lg text-white"
        onClick={toggleDetails}
      >
        <h3 className="text-xl font-semibold">{student.name}</h3>
        <span className="text-xl font-bold">{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <div className="p-4 border-t border-green-200 bg-green-50 transition-all duration-500 ease-in-out">
          <div className="p-4 rounded-lg mt-2">
            <div className="flex items-center mb-4">
              <img
                className="w-24 h-24 rounded-full mr-4 border-2 border-green-300"
                src={`https://avatars.dicebear.com/api/adventurer/${student.id}.svg`}
                alt="Student Avatar"
              />
              <div>
                <p className="text-lg font-semibold">Details:</p>
                <p className="text-sm text-gray-600">
                  Click to edit details below
                </p>
              </div>
            </div>

            {editMode ? (
              <>
                {/* Edit form fields */}
                {[
                  "name",
                  "age",
                  "gender",
                  "college",
                  "batch",
                  "dsaScore",
                  "reactScore",
                  "webdScore",
                ].map((field, index) => (
                  <div key={index} className="mb-6">
                    <label
                      htmlFor={field}
                      className="block mb-2 font-semibold text-gray-800"
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type={
                        field === "age" || field.includes("Score")
                          ? "number"
                          : "text"
                      }
                      name={field}
                      id={field} // Added id for accessibility
                      value={editedStudent[field]}
                      onChange={handleInputChange}
                      className="border border-green-400 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-600 transition duration-200"
                      placeholder={`Enter ${
                        field.charAt(0).toUpperCase() + field.slice(1)
                      }`}
                      required // Added required attribute for basic validation
                    />
                  </div>
                ))}
                <div className="flex justify-between mt-6">
                  <button
                    onClick={handleEditStudent}
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
                {Object.entries(student)
                  .filter(([key]) => key !== "id" && key !== "created_at") // Filter out unwanted keys
                  .map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between items-center p-2 border-b border-gray-300"
                    >
                      <strong className="text-gray-900">
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </strong>
                      <span>{value}</span>
                    </div>
                  ))}
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
