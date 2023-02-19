import { TreeDict } from '@/common/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const layoutTempSlice = createSlice({
  name: 'layoutTemp',
  initialState: {
    menu: {
      visible: false,
    },
    breadCrumbs: {
      dirTree: {} as TreeDict
    }
  },
  reducers: {
    // menu
    toggleMenu: s => { s.menu.visible = !s.menu.visible },
    openMenu: s => { s.menu.visible = true },
    closeMenu: s => { s.menu.visible = false },
    // breadCrumbs
    setDirTree: (s, a: PayloadAction<TreeDict>) => { s.breadCrumbs.dirTree = a.payload },
    clearDirTree: s => { s.breadCrumbs.dirTree = {} },
  }
})

export const layoutTempActions = layoutTempSlice.actions

export const layoutTempReducer = layoutTempSlice.reducer


