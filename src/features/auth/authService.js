import axios from 'axios';
const { updateUserAuthState } = require('../../common/utils');

const API_URL = `/api/users/`;

const saveUserAuthState = (response) => {
  if (response.data) {
    updateUserAuthState(response.data);
  }
};

// Get Current User Profile Details
const getMe = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + 'me', config);

  return response.data;
};

// Update User Profile
const updateUserProfile = async (userData) => {
  const response = await axios.put(API_URL, userData);

  saveUserAuthState(response);

  return response.data;
};

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  saveUserAuthState(response);

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  saveUserAuthState(response);

  return response.data;
};

// Verify user email
const verifyEmail = async (userData) => {
  const response = await axios.post(API_URL + 'verify', userData);

  saveUserAuthState(response);

  return response.data;
};

// Resend Verify user email
const resendEmailOTP = async (email) => {
  const response = await axios.post(API_URL + 'resend-otp', email);
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  updateUserProfile,
  logout,
  login,
  register,
  verifyEmail,
  resendEmailOTP,
  getMe,
};

export default authService;
