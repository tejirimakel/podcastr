import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import dataService from './dataService'

const initialState = {
  countries: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new country
export const createCountry = createAsyncThunk(
  'countries/create',
  async (countryData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await dataService.createCountry(countryData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user countries
export const getCountries = createAsyncThunk(
  'countries/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await dataService.getCountries(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user country
export const deleteCountry = createAsyncThunk(
  'countries/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await dataService.deleteCountry(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCountry.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createCountry.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.countries.push(action.payload)
      })
      .addCase(createCountry.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getCountries.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.countries = action.payload
      })
      .addCase(getCountries.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteCountry.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCountry.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.countries = state.countries.filter(
          (country) => country._id !== action.payload.id
        )
      })
  },
})

export const { reset } = dataSlice.actions
export default dataSlice.reducer
