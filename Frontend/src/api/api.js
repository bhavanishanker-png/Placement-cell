import axios from 'axios';

const API_URL = 'http://localhost:5002';


export const signup = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/register`, {
      email,
      password,
    });
    alert(response.data.message);  // Ensure the backend returns a message in response.data
  } catch (e) {
    console.error('Signup error:', e);
    throw e;  // Re-throw the error so the calling component can catch it
  }
};

export const signin = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/login`, {
      email,
      password,
    });
    alert(response.data.message);  // Ensure the backend returns a message in response.data
  } catch (e) {
    console.error('Signin error:', e);
    throw e;  // Re-throw the error so the calling component can catch it
  }
};
