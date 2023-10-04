import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import countriesReducer from '../features/data/countrySlice';
import citiesReducer from '../features/data/citySlice';
import profileReducer from '../features/profile/profileSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    countries: countriesReducer,
    cities: citiesReducer,
    profile: profileReducer,
  },
});
