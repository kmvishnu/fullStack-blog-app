import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../Features/User/userSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
})