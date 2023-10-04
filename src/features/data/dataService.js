import axios from 'axios';

const API_URL = '/api/data/';

// Get Get categories, skills & accents
const getCSAs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + 'csa', config);

  return response.data;
};

// Get Categories
const getCategories = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + 'categories', config);

  return response.data;
};

// Get Skills
const getSkills = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + 'skills', config);

  return response.data;
};

// Get Accents
const getAccents = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + 'accents', config);

  return response.data;
};

// Create new country
const createCountry = async (countryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + 'countries', countryData, config);

  return response.data;
};

// Get countries
const getCountries = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + 'countries', config);

  return response.data;
};

// Delete country
const deleteCountry = async (countryId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    API_URL + 'countries/' + countryId,
    config
  );

  return response.data;
};

// Update country
const updateCountry = async (countryId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + 'countries/' + countryId, config);

  return response.data;
};

// Create new city
const createCity = async (cityData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + 'cities', cityData, config);

  return response.data;
};

// Get cities by country id
const getCitiesByCountryId = async (countryId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    API_URL + 'countries/cities/' + countryId,
    config
  );

  return response.data;
};

// Get user cities
const getCities = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + 'cities', config);

  return response.data;
};

// Delete city
const deleteCity = async (cityId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + 'cities/' + cityId, config);

  return response.data;
};

// Update city
const updateCity = async (cityId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + 'cities/' + cityId, config);

  return response.data;
};

const countrieservice = {
  getCSAs,
  getCategories,
  getSkills,
  getAccents,
  createCountry,
  getCountries,
  deleteCountry,
  updateCountry,
  getCitiesByCountryId,
  createCity,
  getCities,
  deleteCity,
  updateCity,
};

export default countrieservice;
