import { BottomNavTag } from '@/components/source/constants'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const layoutTempSlice = createSlice({
  name: 'layoutTemp',
  initialState: {
    menu: {
      visible: false,
    },
    source: {
      section: 'files' as BottomNavTag,
    }
  },
  reducers: {
    toggleMenu: s => { s.menu.visible = !s.menu.visible },
    openMenu: s => { s.menu.visible = true },
    closeMenu: s => { s.menu.visible = false },
    goToSourceSection: (s, a: PayloadAction<BottomNavTag>) => { s.source.section = a.payload }
  }
})

export const layoutTempActions = layoutTempSlice.actions

export const layoutTempReducer = layoutTempSlice.reducer


