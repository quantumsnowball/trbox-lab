import { SOURCE_BOTTOM_NAVIGATION } from '@/components/source/constants'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const layoutTempSlice = createSlice({
  name: 'layoutTemp',
  initialState: {
    menu: {
      visible: false,
    },
    source: {
      section: 0,
    }
  },
  reducers: {
    toggleMenu: s => { s.menu.visible = !s.menu.visible },
    openMenu: s => { s.menu.visible = true },
    closeMenu: s => { s.menu.visible = false },
    setSourceSection: (s, a: PayloadAction<number>) => { s.source.section = a.payload },
    goToSourceSection: (s, a: PayloadAction<typeof SOURCE_BOTTOM_NAVIGATION[number]>) => {
      s.source.section = SOURCE_BOTTOM_NAVIGATION.indexOf(a.payload)
    }
  }
})

export const layoutTempActions = layoutTempSlice.actions

export const layoutTempReducer = layoutTempSlice.reducer


