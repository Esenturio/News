import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

export const asyncThunk = (name, type, urlApi, pagination = false) => {

  return createAsyncThunk(
    name,
    async (data, {rejectWithValue}) => {
    try {
      const res = await axios[type](urlApi, type === 'post' || type === 'put' ? data : undefined);
      if(!res.data) {
        throw new Error()
      }
      if (pagination) {
        return {...res.data, ...res.meta}
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(error)
    }
  }
  )
};

export function setLoading (state, message = false) {
  if (message) {
    state.loading = 'loading'
    return
  }
  state.loading = true
}

export function unsetLoading (state, message = false) {
  state.loading = message
}

export function getArray(array, cart=false) {
  if (!Array.isArray(array)) {
    return console.log('not an array')
  }

  console.log(array);

  let image = '';
  return array.map(item => {
    if (item.attributes.thumbnail.data) {
      if (item.attributes.thumbnail.data.attributes.formats && item.attributes.thumbnail.data.attributes.formats.small) {image = item.attributes.thumbnail.data.attributes.formats.small.url}
      else if (item.attributes.thumbnail.data.attributes.formats && item.attributes.thumbnail.data.attributes.formats.thumbnail) {image = item.attributes.thumbnail.data.attributes.formats.thumbnail.url}
      else {image = item.attributes.thumbnail.data.attributes.url}
    }

    // console.log(item.attributes.author ? item.attributes.author.data.attributes.username : 'Не известен');
    // console.log(item.attributes);

    return {
      id: item.id,
      ...item.attributes,
      thumbnail: image,
      category: item.attributes.categor ? item.attributes.categor : 'Нет категории',
      author: {
        username: item.attributes.author && item.attributes.author.data ? item.attributes.author.data.attributes.profileName : 'Не известен',
        job: item.attributes.author && item.attributes.author.data ? item.attributes.author.data.attributes.job : 'Нет'
      },
    }
  })
}