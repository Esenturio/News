import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { asyncThunk, getArray, setLoading, unsetLoading } from "../../helpers/asyncThunk";

export const catFetch = asyncThunk('category/get', 'get', '/api/news?fields=category')

export const newsFetch = asyncThunk('news/get', 'get', '/api/news')

export const newsPost = createAsyncThunk('news/post',
  async (data, {rejectWithValue, getState}) => {
    try {
      let token = getState().user.auth.token;
      console.log(typeof token);
      console.log(getState());
      const res = await axios.post('/api/news', {data: data}, {headers: {Authorization: `Bearer ${token}`}})
      console.log(res);
      console.log('alsdfkjlaskfj');
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    data: [],
    loading: false,
    categories: [],
  },
  extraReducers: {
    [catFetch.pending]: (state) =>{
      setLoading(state)
    },
    [catFetch.fulfilled]: (state, action) => {
      unsetLoading(state)
      state.categories = getArray(action.payload.data)
      console.log(getArray(action.payload.data));
    },
    [catFetch.rejected]: (state) => {
      unsetLoading(state, 'error')
    },
    [newsFetch.pending]: (state) =>{
      setLoading(state)
    },
    [newsFetch.fulfilled]: (state, action) => {
      unsetLoading(state)
      state.data = getArray(action.payload.data)
    },
    [newsFetch.rejected]: (state) => {
      unsetLoading(state, 'error')
    },
    [newsPost.pending]: (state) =>{
      setLoading(state)
    },
    [newsPost.fulfilled]: (state) => {
      unsetLoading(state)
    },
    [newsPost.rejected]: (state) => {
      unsetLoading(state, 'error')
    },
  }
})

export default newsSlice.reducer