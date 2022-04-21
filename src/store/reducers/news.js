import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { getArray, setLoading, unsetLoading } from "../../helpers/asyncThunk";

export const newsFetch = createAsyncThunk(
  'news/get',
  async (page, {rejectWithValue}) => {
  try {
    const res = await axios.get(`/api/news?populate=*&pagination[pageSize]=10&pagination[page]=${page}`);
    if(!res.data) {
      throw new Error()
    }
    return {...res.data, ...res.meta};
  } catch (error) {
    return rejectWithValue(error)
  }
}
)

export const catFetch = createAsyncThunk(
  'news/get/cat',
  async (cat, {rejectWithValue}) => {
  try {
    const res = await axios.get(`/api/news?filters[0][categor][$contains]=${cat}`);
    if(!res.data) {
      throw new Error()
    }
    return {...res.data,};
  } catch (error) {
    return rejectWithValue(error)
  }
}
)

export const newsPost = createAsyncThunk('news/post',
  async (data, {rejectWithValue, getState}) => {
    try { 
      let token = getState().auth.user.token;
      data.author = getState().auth.user.id;
      await axios.post('/api/news', {data: data}, {headers: {Authorization: `Bearer ${token}`}})
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const newsPut = createAsyncThunk('news/post',
  async (data, {rejectWithValue, getState}) => {
    try { 
      let id = data.id;
      let token = getState().auth.user.token;
      data.data.author = getState().auth.user.id;
      await axios.put('/api/news/'+id, {data: data.data}, {headers: {Authorization: `Bearer ${token}`}});
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const remove = createAsyncThunk('news/delete', 
async (data, {rejectWithValue, getState}) => {
  try {
    let token = getState().auth.user.token;
    axios.delete('/api/news/'+data, {headers: {Authorization: `Bearer ${token}`}})
  } catch (error) {
    rejectWithValue(error)
  }
})

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    data: [],
    loading: false,
    categories: [],
    page: null,
    meta: {},
    filtredData:[]
  },
  reducers: {
    getItemsByCat: (state, action) => {
      let cat = action.payload;
      let newData = state.data.filter((item,index)=>{
        return item.categor.includes(cat)
      })
      state.filtredData = newData
    },
    recoverFilter: (state) => {
      state.filtredData = state.data
    }
  },
  extraReducers: {
    [catFetch.pending]: (state) =>{
      setLoading(state, true);
    },
    [catFetch.fulfilled]: (state, action) => {
      unsetLoading(state, 'success');
      state.data = getArray(action.payload.data);
    },
    [catFetch.rejected]: (state) => {
      unsetLoading(state, 'error');
    },
    [newsFetch.pending]: (state) =>{
      setLoading(state, true);
    },
    [newsFetch.fulfilled]: (state, action) => {
      console.log(action.payload);
      unsetLoading(state, 'success');
      state.data = getArray(action.payload.data);
      state.meta = action.payload.meta;
    },
    [newsFetch.rejected]: (state) => {
      unsetLoading(state, 'error')
    },
    [newsPost.pending]: (state) =>{
      setLoading(state, true)
    },
    [newsPost.fulfilled]: (state) => {
      unsetLoading(state, 'success')
    },
    [newsPost.rejected]: (state) => {
      unsetLoading(state, 'error')
    },
    [remove.pending]: (state) => {
      setLoading(state, true)
    },
    [remove.fulfilled]: (state) => {
      unsetLoading(state, 'success')
    },
    [remove.rejected]: (state) => {
      unsetLoading(state, 'error')
    },
  }
})

export default newsSlice.reducer
export const {getItemsByCat} = newsSlice.actions