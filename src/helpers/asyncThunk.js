import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

export const asyncThunk = (name, type, urlApi) => {

  return createAsyncThunk(
    name,
    async (data, {rejectWithValue}) => {
    try {
      const res = await axios[type](urlApi, type === 'post' || type === 'put' ? data : undefined);
      if(!res.data) {
        throw new Error()
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(error)
    }
  }
  )
};

export function setLoading (state) {
  state.loading = true
}

export function unsetLoading (state, message = false) {
  state.loading = message
}

export function getArray(array) {
  return array.map(item => {
    return {
      id: item.id,
      ...item.attributes
    }
  })
}