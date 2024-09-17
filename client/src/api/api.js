import axios from 'axios';

const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001'; // Fallback to local URL during development

export const signup = async (email, password) => {
  try {
    const response = await axios.post(`${backendURL}/api/register`, { email, password });
    return response.data;  // Success: return the data
  } catch (error) {
    if (error.response) {
      // Backend responded with a status other than 2xx
      console.error('Signup error (backend):', error.response.data);
      throw new Error(error.response.data.message || 'Signup failed');
    } else if (error.request) {
      // Request was made but no response was received
      console.error('Signup error (no response):', error.request);
      throw new Error('No response from the server');
    } else {
      // Other errors (e.g. setup issues)
      console.error('Signup error:', error.message);
      throw new Error('An error occurred during signup');
    }
  }
};

export const signin = async (email, password) => {
  try {
    const response = await axios.post(`${backendURL}/api/login`, { email, password });
    alert(response.data.message);  // Assuming message exists in response
    return response.data;  // Return response data if needed
  } catch (error) {
    if (error.response) {
      // Backend responded with an error
      console.error('Signin error (backend):', error.response.data);
      throw new Error(error.response.data.message || 'Signin failed');
    } else if (error.request) {
      // No response was received from the backend
      console.error('Signin error (no response):', error.request);
      throw new Error('No response from the server');
    } else {
      // Other unknown errors
      console.error('Signin error:', error.message);
      throw new Error('An error occurred during signin');
    }
  }
};
