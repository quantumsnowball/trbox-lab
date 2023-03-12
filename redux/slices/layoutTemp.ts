import { SourceBottomNavTag } from '@/components/source/constants'
import { ResultBottomNavTag } from '@/components/result/constants'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StudyPlotMode } from '@/components/result/Study/MarksDrawer/ControlButtons'


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
        checked: {} as { [path: string]: string[] },
      },
      study: {
        selected: {} as { [path: string]: string | null },
        mode: {} as {
          [path: string]: {
            [strategy: string]: {
              [name: string]: StudyPlotMode
            }
          }
        },
      },
      trades: {
        selected: {} as { [path: string]: string | null },
      },
    },
    wsConnected: false
  },
  reducers: {
    //
    // GENERAL
    //
    toggleMenu: s => { s.menu.visible = !s.menu.visible },
    openMenu: s => { s.menu.visible = true },
    closeMenu: s => { s.menu.visible = false },
    //
    // SOURCE
    //
    goToSourceSection: (s, a: PayloadAction<SourceBottomNavTag>) => { s.source.section = a.payload },
    toggleSourceFileDeleteMode: s => { s.source.fileOps.deleteMode = !s.source.fileOps.deleteMode },
    // run
    setWsConnected: (s, a: PayloadAction<boolean>) => { s.wsConnected = a.payload },
    //
    // RESULT
    //
    goToResultSection: (s, a: PayloadAction<ResultBottomNavTag>) => { s.result.section = a.payload },
    toggleResultFileDeleteMode: s => { s.result.fileOps.deleteMode = !s.result.fileOps.deleteMode },
    // metrics
    setMetricsSort: (s, a: PayloadAction<string>) => { s.result.metrics.sort = a.payload },
    resetMetricsOrder: s => { s.result.metrics.order = 'desc' },
    toggleMetricsOrder: s => { s.result.metrics.order = s.result.metrics.order === 'asc' ? 'desc' : 'asc' },
    // equity
    setEquityChecked: (s, a: PayloadAction<{ path: string, checked: string[] }>) => { s.result.equity.checked[a.payload.path] = a.payload.checked },
    // study
    setStudySelected: (s, a: PayloadAction<{ path: string, selected: string | null }>) => { s.result.study.selected[a.payload.path] = a.payload.selected },
    setStudyMode: (s, a: PayloadAction<{ path: string, strategy: string, name: string, mode: StudyPlotMode }>) => {
      const { path, strategy, name, mode } = a.payload
      s.result.study.mode[path] ??= {}
      s.result.study.mode[path][strategy] ??= {}
      s.result.study.mode[path][strategy][name] ??= null
      s.result.study.mode[path][strategy][name] = mode
    },
    // trades
    setTradesSelected: (s, a: PayloadAction<{ path: string, selected: string | null }>) => { s.result.trades.selected[a.payload.path] = a.payload.selected },
  }
})

export const layoutTempActions = layoutTempSlice.actions

export const layoutTempReducer = layoutTempSlice.reducer


