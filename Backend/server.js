require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const emailValidator = require('email-validator');

const app = express();
app.use(express.json());
app.use(cors());

// MySQL connection for authorization (auth_db)
const authDb = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '9398957405@Pp',
    database: process.env.AUTH_DB_NAME || 'auth_db',
    port: process.env.DB_PORT || 3306
});

// MySQL connection for student database (student_db)
const studentDb = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '9398957405@Pp',
    database: process.env.STUDENT_DB_NAME || 'student_db',
    port: process.env.DB_PORT || 3306
});

// MySQL connection for jobdetails database


// Connect to databases
authDb.connect((err) => {
    if (err) {
        console.error('Error connecting to auth_db:', err.message);
        return;
    }
    console.log('Connected to auth_db MySQL server.');
});

studentDb.connect((err) => {
    if (err) {
        console.error('Error connecting to student_db:', err.message);
        return;
    }
    console.log('Connected to student_db MySQL server.');
});

studentDb.connect((err) => {
    if (err) {
        console.error('Error connecting to jobdetails database:', err.message);
        return;
    }
    console.log('Connected to jobdetails MySQL database.');
});

// API for user registration
app.post('/api/register', (req, res) => {
    const { email, password } = req.body;

    // Check if email format is valid
    if (!emailValidator.validate(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // Hash the password before storing
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ message: 'Error hashing password' });
        }

        // Check if user already exists
        const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
        authDb.query(checkUserQuery, [email], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Database error' });
            }
            if (result.length > 0) {
                return res.status(400).json({ message: 'User already exists' });
            }
            // Insert new user
            const insertUserQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
            authDb.query(insertUserQuery, [email, hash], (err, result) => {
                if (err) {
                    return res.status(500).json({ message: 'Database error' });
                }
                res.status(201).json({ message: 'User registered successfully' });
            });
        });
    });
});

// API for logging in
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Check if email format is valid
    if (!emailValidator.validate(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    const query = 'SELECT * FROM users WHERE email = ?';
    authDb.query(query, [email], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Server error' });
        }
        if (result.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        const user = result[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: 'Error comparing passwords' });
            }
            if (isMatch) {
                return res.json({ message: 'Login successful' });
            } else {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
        });
    });
});

// API to get students
app.get('/api/students', (req, res) => {
    const query = 'SELECT * FROM students';
    studentDb.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching students', error: err });
        }
        res.json(results);
    });
});

// API to add a student
app.post('/api/students', (req, res) => {
    const { name, age, gender, college, batch, status, dsaScore, reactScore, webdScore } = req.body;

    if (!name || !age || !gender || !college || !batch || !dsaScore || !reactScore || !webdScore) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const insertStudentQuery = `
        INSERT INTO students (name, age, gender, college, batch, status, dsaScore, reactScore, webdScore) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    studentDb.query(insertStudentQuery, [name, age, gender, college, batch, status, dsaScore, reactScore, webdScore], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(201).json({ message: 'Student added successfully', studentId: result.insertId });
    });
});

// API to add an interview
app.post('/api/interviews', (req, res) => {
    const { company, date } = req.body;

    if (!company || !date) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const insertInterviewQuery = `
        INSERT INTO interviews (company, date) 
        VALUES (?, ?)`;

    studentDb.query(insertInterviewQuery, [company, date], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(201).json({ message: 'Interview added successfully', interviewId: result.insertId });
    });
});

// API to get interviews with students
app.get('/api/interviews', (req, res) => {
    const interviewQuery = `SELECT * FROM interviews`;
    const studentQuery = `SELECT * FROM students`;

    // First, get all interviews
    studentDb.query(interviewQuery, (err, interviewResults) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch interview data' });
        }

        if (interviewResults.length === 0) {
            return res.status(404).json({ error: 'No interviews found' });
        }

        // Then, get all students (if students are linked to interviews, adjust this query)
        studentDb.query(studentQuery, (err, studentResults) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to fetch students data' });
            }

            // Assuming no direct relationship between interviews and students, send all students for each interview
            const interviewsWithStudents = interviewResults.map(interview => ({
                companyName: interview.company,
                date: interview.date,
                students: studentResults.map(student => ({
                    name: student.name,
                    email: student.email,
                    result: student.result
                }))
            }));

            res.json(interviewsWithStudents);
        });
    });
});

// API to add jobs
app.post('/api/jobs', (req, res) => {
    const jobs = req.body; // Expecting an array of job objects

    jobs.forEach(job => {
        const sql = 'INSERT INTO jobs (id, title, company, type, date, location, salary, logo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [job.id, job.title, job.company, job.type, job.date, job.location, job.salary, job.logo];
        
        studentDb.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error inserting job:', err);
                return;
            }
            // console.log('Job inserted:', result);
        });
    });

    res.send('Jobs data inserted successfully.');
});
app.get('/api/jobs', (req, res) => {
    studentDb.query('SELECT * FROM jobs', (err, results) => {
      if (err) {
        console.error('Error fetching jobs:', err);
        res.status(500).json({ error: 'Database query failed' });
        return;
      }
      res.json(results);
    });
  });  

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
