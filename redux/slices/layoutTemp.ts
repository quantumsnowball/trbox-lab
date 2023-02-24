import { SourceBottomNavTag } from '@/components/source/constants'
import { ResultBottomNavTag } from '@/components/result/constants'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const layoutTempSlice = createSlice({
  name: 'layoutTemp',
  initialState: {
    menu: {
      visible: false,
    },
    source: {
      section: 'files' as SourceBottomNavTag,
    },
    result: {
      section: 'files' as ResultBottomNavTag,
    },
    wsConnected: false
  },
  reducers: {
    toggleMenu: s => { s.menu.visible = !s.menu.visible },
    openMenu: s => { s.menu.visible = true },
    closeMenu: s => { s.menu.visible = false },
    goToSourceSection: (s, a: PayloadAction<SourceBottomNavTag>) => { s.source.section = a.payload },
    goToResultSection: (s, a: PayloadAction<ResultBottomNavTag>) => { s.result.section = a.payload },
    setWsConnected: (s, a: PayloadAction<boolean>) => { s.wsConnected = a.payload },
  }
})

export const layoutTempActions = layoutTempSlice.actions

export const layoutTempReducer = layoutTempSlice.reducer


