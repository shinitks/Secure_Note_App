import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,  // Required for cookies
});

export default api;
