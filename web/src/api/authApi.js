import axios from 'axios';

// Get the base URL from environment variables. 
// This makes it easy to switch between development and production.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const authApi = axios.create({
  baseURL: API_BASE_URL,
});

export const loginUser = async (credentials) => {
  try {
    // Make a POST request to the /auth/login endpoint
    const response = await authApi.post('/auth/login', credentials);
    return response.data; // The response will contain the user and token
  } catch (error) {
    // Throw an error with the message from the server, or a default message
    throw new Error(error.response?.data?.message || 'An error occurred during login.');
  }
};

// We can add the registerUser function here later
export const registerUser = async (userData) => {
  // ... to be implemented
};