import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Data } from 'plotly.js'


const contentSlice = createSlice({
  name: 'content',
  initialState: {
    result: {
      study: {
        data: {} as {
          [path: string]: {
            [strategy: string]: Data[]
          }
        }
      }
    }
  },
  reducers: {
    addPlotlyChartData: (s, a: PayloadAction<{ path: string, strategy: string, data: Data }>) => {
      const { path, strategy, data } = a.payload
      s.result.study.data[path] ??= {}
      s.result.study.data[path][strategy] ??= []
      s.result.study.data[path][strategy] =
        [...s.result.study.data[path][strategy], data]
    },
    removePlotlyChartData: (s, a: PayloadAction<{ path: string, strategy: string, name: string }>) => {
      const { path, strategy, name } = a.payload
      s.result.study.data[path] ??= {}
      s.result.study.data[path][strategy] ??= []
      s.result.study.data[path][strategy] =
        s.result.study.data[path][strategy].filter(data => data.name !== name)
    }
  }
})

export const contentActions = contentSlice.actions

export const contentReducer = contentSlice.reducer




