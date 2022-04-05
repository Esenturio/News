import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../api/axios'
import { setLoading, unsetLoading } from "../../helpers/asyncThunk";

export const userAuth = createAsyncThunk(
  'user/auth',
  async (data, {rejectWithValue}) => {
    try {
      let user = await axios.post('/api/auth/local', data)
      if (!user.data) {
        throw new Error('No data')
      }
      return user.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false
  },
  extraReducers: {
    [userAuth.pending] : (state) => {
      setLoading(state)
    },
    [userAuth.fulfilled] : (state, action) => {
      unsetLoading(state)
      console.log(action.payload.jwt);
      state.user = {
        token: action.payload.jwt,
        ...action.payload.user,
      }
    },
    [userAuth.rejected] : (state) => {
      unsetLoading(state)
    }
  }
})

export default authSlice.reducer