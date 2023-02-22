import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const layoutTempSlice = createSlice({
  name: 'layoutTemp',
  initialState: {
    menu: {
      visible: false,
    },
    source: {
      sectionId: 0
    }
  },
  reducers: {
    toggleMenu: s => { s.menu.visible = !s.menu.visible },
    openMenu: s => { s.menu.visible = true },
    closeMenu: s => { s.menu.visible = false },
    setSourceSection: (s, a: PayloadAction<number>) => { s.source.sectionId = a.payload },
  }
})

export const layoutTempActions = layoutTempSlice.actions

export const layoutTempReducer = layoutTempSlice.reducer


