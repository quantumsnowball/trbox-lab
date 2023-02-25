import { FileNode } from '@/common/types'
import { cleanUrl } from '@/common/utils'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { layoutTempActions } from './layoutTemp'

export var ws: WebSocket

export type Metrics = {
  columns: string[],
  index: string[],
  data: number[][],
}

export type Equity = {
  [timestamp: string]: number
}
export type Equities = {
  [name: string]: Equity
}

export type Line = {
  type: 'stdout' | 'stderr' | 'system'
  text: string
}
export type Lines = Line[]

export const trboxLabApi = createApi({
  reducerPath: 'trboxLabApi',
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: builder => ({
    runSource: builder.query<Lines, string>({
      query: (path: string) => cleanUrl(`run/init/${path}`),
      keepUnusedDataFor: 86400, // one day
      onQueryStarted: async (path, { updateCachedData, dispatch }) => {
        // create a websocket connection when the cache subscription starts
        ws = new WebSocket(cleanUrl(`ws://${window.location.host}/api/run/output/${path}`))
        ws.addEventListener('open', () => dispatch(layoutTempActions.setWsConnected(true)))
        ws.addEventListener('close', () => dispatch(layoutTempActions.setWsConnected(false)))
        console.debug('ws connected')
        // listen to ws message and update the cache value
        ws.addEventListener('message', (event: MessageEvent) => {
          const line: Line = JSON.parse(event.data)
          updateCachedData((lines) => { lines.push(line) })
          // server side indicate process has completed, exiting
          if (line.type === 'system' && line.text === 'exit') {
            ws.close()
            console.debug('ws.close()')
            return
          }
        })
        console.debug('listening to ws message updates')
      }
    }),
    getSourceTree: builder.query<FileNode, void>({
      query: () => `tree/source`
    }),
    getSource: builder.query<string, string>({
      query: (path: string) => ({
        url: cleanUrl(`source/${path}`),
        responseHandler: 'text'
      }),
    }),
    getResultTree: builder.query<FileNode, void>({
      query: () => `tree/result`
    }),
    getResultSource: builder.query<string, string>({
      query: (path: string) => ({
        url: cleanUrl(`result/${path}/source`),
        responseHandler: 'text'
      }),
    }),
    getMetrics: builder.query<Metrics, string>({
      query: (path: string) => cleanUrl(`result/${path}/metrics`)
    }),
    getEquity: builder.query<Equities, string>({
      query: (path: string) => cleanUrl(`result/${path}/equity`)
    }),
  }),
})

export const {
  // run
  useLazyRunSourceQuery,
  // source
  useGetSourceTreeQuery,
  useLazyGetSourceTreeQuery,
  useGetSourceQuery,
  // result
  useGetResultTreeQuery,
  useGetResultSourceQuery,
  useLazyGetResultTreeQuery,
  useGetMetricsQuery,
  useGetEquityQuery,
} = trboxLabApi

export const {
  useQueryState: useRunSourceQueryState
} = trboxLabApi.endpoints.runSource

