import React from 'react';
import StudentList from './StudentList.js';
import ScheduledInterviews from './InterviewList.js';
function Home() {
  return (
    <div 
      className="Home" 
      style={{display:"flex", flexDirection:"column",alignItems:"center",justifyContent:"center",}}
    >
      <StudentList  /> 
      <ScheduledInterviews/>
    </div>

  );
}

export default Home;
