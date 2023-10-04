import axios from 'axios';

const API_URL = '/api/users/';

// Get Personal Details
const getPersonalDetails = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + 'personal/', config);

  return response.data;
};

// Update Personal Details
const updatePersonalDetails = async (personalDetails, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + 'personal/',
    personalDetails,
    config
  );

  return response.data;
};

// Get Profile Details
const getProfileDetails = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + 'profile', config);

  return response.data;
};

// Update Profile Details
const updateProfileDetails = async (profileDetails, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + 'profile', profileDetails, config);

  return response.data;
};

// Update Profile Image
const uploadProfileImage = async (imageData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + 'upload/', imageData, config);

  return response.data;
};

// Update User Type
const updateUserType = async (userTypeObject, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + 'user-type/',
    userTypeObject,
    config
  );

  return response.data;
};

// Is username exists
const usernameExists = async (usernameData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(config);
  const response = await axios.post(API_URL + 'username', usernameData, config);

  return response.data;
};

const personalServices = {
  getProfileDetails,
  updateProfileDetails,
  getPersonalDetails,
  uploadProfileImage,
  updatePersonalDetails,
  updateUserType,
  usernameExists,
};

export default personalServices;
