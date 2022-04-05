import { configureStore } from '@reduxjs/toolkit'
import restorauntSlice from './reducers/restoraunt.reducer'
import auth from './reducers/auth'
import newsSlice from './reducers/news'

export const store = configureStore({
  reducer: {
    auth: auth,
    news: newsSlice
  }
})