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
      fileOps: { deleteMode: false },
      metrics: {
        sort: 'sharpe',
        order: 'desc' as 'asc' | 'desc'
      },
      equity: {
        checked: {} as { [key: string]: string[] },
      },
      trades: {
        selected: {} as { [key: string]: string },
      }
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
    toggleResultFileDeleteMode: s => { s.result.fileOps.deleteMode = !s.result.fileOps.deleteMode },
    setWsConnected: (s, a: PayloadAction<boolean>) => { s.wsConnected = a.payload },
    setMetricsSort: (s, a: PayloadAction<string>) => { s.result.metrics.sort = a.payload },
    resetMetricsOrder: s => { s.result.metrics.order = 'desc' },
    toggleMetricsOrder: s => { s.result.metrics.order = s.result.metrics.order === 'asc' ? 'desc' : 'asc' },
    setEquityChecked: (s, a: PayloadAction<{ path: string, checked: string[] }>) => { s.result.equity.checked[a.payload.path] = a.payload.checked },
    setTradesSelected: (s, a: PayloadAction<{ path: string, selected: string }>) => { s.result.trades.selected[a.payload.path] = a.payload.selected },
  }
})

export const layoutTempActions = layoutTempSlice.actions

export const layoutTempReducer = layoutTempSlice.reducer


