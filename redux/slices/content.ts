import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Data } from 'plotly.js'


const contentSlice = createSlice({
  name: 'content',
  initialState: {
    result: {
      study: {
        series: {} as {
          [path: string]: {
            [strategy: string]: {
              [name: string]: Data
            }
          }
        }
      }
    }
  },
  reducers: {
    addPlotlyChartSeries: (s, a: PayloadAction<{ path: string, strategy: string, name: string, data: Data }>) => {
      const { path, strategy, data, name } = a.payload
      s.result.study.series[path] ??= {}
      s.result.study.series[path][strategy] ??= {}
      s.result.study.series[path][strategy][name] = data
    },
    removePlotlyChartSeries: (s, a: PayloadAction<{ path: string, strategy: string, name: string }>) => {
      const { path, strategy, name } = a.payload
      delete s.result.study.series[path]?.[strategy]?.[name]
    }
  }
})

export const contentActions = contentSlice.actions

export const contentReducer = contentSlice.reducer




