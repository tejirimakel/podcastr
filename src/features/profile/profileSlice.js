import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserAuthState } from '../../common/utils';
import profileService from './profileService';

// Get user from localStorage
const user = getUserAuthState();

const initialState = {
  user: user ? user : null,
  personal: {
    first_name: '',
    last_name: '',
    gender: '',
    country: '',
    city: '',
    time_zone: '',
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Update personal details
export const updatePersonalDetails = createAsyncThunk(
  'personaldetails/update',
  async (personalDetails, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await profileService.updatePersonalDetails(personalDetails, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.personal &&
          error.response.personal.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user personal details
export const getPersonalDetails = createAsyncThunk(
  'personaldetails/get',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await profileService.getPersonalDetails(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.personal &&
          error.response.personal.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const personalSlice = createSlice({
  name: 'personal',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePersonalDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePersonalDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.user = action.payload.user;
        state.personal = action.payload.personal;
      })
      .addCase(updatePersonalDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPersonalDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPersonalDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.personal = action.payload.personal;
      })
      .addCase(getPersonalDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = action.payload.user;
        state.personal = action.payload.personal;
      });
  },
});

export const { reset } = personalSlice.actions;
export default personalSlice.reducer;
