import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OrderResult, TradeLog } from '../../common/types'


const contentTempSlice = createSlice({
  name: 'contentTemp',
  initialState: {
    equityCurve: {
      value: null as string | null
    },
    tradelog: [] as TradeLog
  },
  reducers: {
    setEquityValue: (s, a: PayloadAction<number>) => {
      const text = a.payload.toLocaleString(
        'en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2
      })
      s.equityCurve.value = text
    },
    addOrderResult: (s, a: PayloadAction<OrderResult>) => {
      s.tradelog.unshift(a.payload)
    },
    setTradeLog: (s, a: PayloadAction<TradeLog>) => {
      s.tradelog = a.payload
    },
    clearTradeLog: s => { s.tradelog = [] }
  }
})

export const contentTempActions = contentTempSlice.actions

export const contentTempReducer = contentTempSlice.reducer

