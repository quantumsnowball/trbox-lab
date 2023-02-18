import { ColorMode } from '@/common/types'
import { createSlice } from '@reduxjs/toolkit'


const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: 'light' as ColorMode
  },
  reducers: {
    toggleMode: s => {
      s.mode = s.mode === 'light' ? 'dark' : 'light'
    },
  }
})

export const themeActions = themeSlice.actions

export const themeReducer = themeSlice.reducer



