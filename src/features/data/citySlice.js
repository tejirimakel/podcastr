import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import dataService from './dataService'

const initialState = {
  cities: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new city
export const createCity = createAsyncThunk(
  'cities/create',
  async (cityData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await dataService.createCity(cityData, token)
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

// Get user cities
export const getCities = createAsyncThunk(
  'cities/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await dataService.getCities(token)
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

// Delete user city
export const deleteCity = createAsyncThunk(
  'cities/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await dataService.deleteCity(id, token)
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

// Get user cities by country id
export const getCitiesByCountryId = createAsyncThunk(
  'cities/getByCountryId',
  async (CountryId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await dataService.getCitiesByCountryId(CountryId, token)
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
      .addCase(createCity.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createCity.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cities.push(action.payload)
      })
      .addCase(createCity.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getCities.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCities.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.cities = action.payload
      })
      .addCase(getCities.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteCity.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCity.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cities = state.cities.filter(
          (city) => city._id !== action.payload.id
        )
      })
      .addCase(deleteCity.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getCitiesByCountryId.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCitiesByCountryId.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.cities = action.payload
      })
      .addCase(getCitiesByCountryId.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = dataSlice.actions
export default dataSlice.reducer
