import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../api/axios'
import { setLoading, unsetLoading } from "../../helpers/asyncThunk";
import cookie from 'cookie'

export const userAuth = createAsyncThunk(
  'user/auth',
  async (data, {rejectWithValue}) => {
    try {
      let toRet = {};
      let user = await axios.post('/api/auth/local?populate=*', data);
      toRet = {
        ...user.data
      };
      let res = await axios.get('/api/profiles?filters[user][id][$eq]='+user.data.user.id+'&populate=*');
      toRet.username = res.data.data[0].attributes.profileName;
      toRet.id = res.data.data[0].id;
      toRet.avatar = res.data.data[0].attributes.avatar ? res.data.data[0].attributes.avatar.data.attributes.url : 'Нет изображения';
      toRet.job = res.data.data[0].attributes.job;
      if (!user.data || !res.data) {
        throw new Error('No data');
      }
      return {data: toRet, meta: {length: res.data.data[0].attributes.news.data.length}};
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loading = false;
      document.cookie='user=null;expires=-1';
    },
    addCookie: (state) => {
      let data = cookie.parse(document.cookie);
      if ('user' in data) {
        state.user = JSON.parse(data.user);
      }
    }
  },
  extraReducers: {
    [userAuth.pending] : (state) => {
      setLoading(state, true)
    },
    [userAuth.fulfilled] : (state, action) => {
      unsetLoading(state, 'success');
      console.log(action.payload);
      state.user = {
        token: action.payload.data.jwt,
        ...action.payload.data.user,
        username: action.payload.data.username,
        avatar: action.payload.data.avatar,
        job: action.payload.data.job,
        id: action.payload.data.id,
        count: action.payload.meta.length
      };
    },
    [userAuth.rejected] : (state) => {
      unsetLoading(state)
    }
  }
})

export const {logout, addCookie} = authSlice.actions;

export default authSlice.reducer