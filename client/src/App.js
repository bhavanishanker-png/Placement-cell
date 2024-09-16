
// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import Home from './Home';
import Navbar from './Navbar';
import AddStudentForm from './AddstudentsInfo';
import StudentList from './StudentList'; // Ensure this path is correct
import AddInterview from './AddInterviews';
import JobList from './jobsList';
function LayoutWithNavbar() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Routes without Navbar */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          {/* Routes with Navbar */}
          <Route element={<LayoutWithNavbar />}>
          <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/add-student" element={<AddStudentForm />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/add-interview" element={<AddInterview />} />
            <Route path="/job-portal" element={<JobList />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
