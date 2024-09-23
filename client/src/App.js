import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import Home from './Home';
import Navbar from './Navbar';
import AddStudentForm from './AddstudentsInfo';
import StudentList from './StudentList';
import AddInterview from './AddInterviews';
import JobList from './jobsList';
import { AuthProvider } from './Context/AuthContext'; // Ensure this import is correct

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
    <AuthProvider> {/* Wrap your entire app in AuthProvider */}
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

            {/* Fallback route for undefined paths */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
