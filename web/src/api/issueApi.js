import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create an Axios instance that can be configured with auth headers
const issueApi = axios.create({
  baseURL: API_BASE_URL,
});

// This is a "request interceptor". It will add the auth token to every request.
issueApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


// Function to create a new issue
export const createIssue = async (issueData) => {
  try {
    const response = await issueApi.post('/issues', issueData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create issue.');
  }
};

// Function to get issues (we'll use this for the dashboard later)
export const getMyIssues = async () => {
  try {
    // We'll need to create this backend route later
    const response = await issueApi.get('/issues/my-issues'); 
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch issues.');
  }
};