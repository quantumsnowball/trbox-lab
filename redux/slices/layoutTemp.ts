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
      fileOps: { deleteMode: false },
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
    toggleSourceFileDeleteMode: s => { s.source.fileOps.deleteMode = !s.source.fileOps.deleteMode },
    setWsConnected: (s, a: PayloadAction<boolean>) => { s.wsConnected = a.payload },
  }
})

export const layoutTempActions = layoutTempSlice.actions

export const layoutTempReducer = layoutTempSlice.reducer


