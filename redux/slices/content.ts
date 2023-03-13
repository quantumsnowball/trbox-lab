import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Data } from 'plotly.js'


export type PlotTarget = 'main' | 'sub1'
export type StudyPlotMode = PlotTarget | null

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    result: {
      study: {
        series: {} as {
          [path: string]: {
            [strategy: string]: {
              main: { [name: string]: Data }
              sub1: { [name: string]: Data }
            }
          }
        }
      }
    }
  },
  reducers: {
    addPlotlyChartSeries: (s, a: PayloadAction<{ path: string, strategy: string, name: string, target: PlotTarget, data: Data }>) => {
      const { path, strategy, data, target, name } = a.payload
      s.result.study.series[path] ??= {}
      s.result.study.series[path][strategy] ??= { main: {}, sub1: {} }
      s.result.study.series[path][strategy][target][name] = data
    },
    removePlotlyChartSeries: (s, a: PayloadAction<{ path: string, strategy: string, name: string, target: PlotTarget }>) => {
      const { path, strategy, name, target } = a.payload
      delete s.result.study.series[path]?.[strategy]?.[target]?.[name]
    }
  }
})

export const contentActions = contentSlice.actions

export const contentReducer = contentSlice.reducer




