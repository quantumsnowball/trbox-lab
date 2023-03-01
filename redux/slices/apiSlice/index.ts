import { FileNode } from '@/common/types'
import { cleanUrl } from '@/common/utils'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { layoutTempActions } from '@/redux/slices/layoutTemp'
import { Equities, Line, Lines, Meta, Metrics, TradesSchema } from './types'

export var ws: WebSocket

export const trboxLabApi = createApi({
  reducerPath: 'trboxLabApi',
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['FileTree',],
  endpoints: builder => ({
    // 
    // run
    // 
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
    // 
    // source
    // 
    getSourceTree: builder.query<FileNode, void>({
      query: () => `tree/source`,
      providesTags: ['FileTree',],
    }),
    getSource: builder.query<string, string>({
      query: (path: string) => ({
        url: cleanUrl(`source/${path}`),
        responseHandler: 'text'
      }),
    }),
    // 
    // result
    // 
    getResultTree: builder.query<FileNode, void>({
      query: () => `tree/result`,
      providesTags: ['FileTree',],
    }),
    getResultSource: builder.query<string, string>({
      query: (path: string) => ({
        url: cleanUrl(`result/${path}/source`),
        responseHandler: 'text'
      }),
    }),
    getMeta: builder.query<Meta, string>({
      query: (path: string) => cleanUrl(`result/${path}/meta`)
    }),
    getMetrics: builder.query<Metrics, string>({
      query: (path: string) => cleanUrl(`result/${path}/metrics`)
    }),
    getEquity: builder.query<Equities, string>({
      query: (path: string) => cleanUrl(`result/${path}/equity`)
    }),
    getTrades: builder.query<TradesSchema, { path: string, strategy: string }>({
      query: ({ path, strategy }: { path: string, strategy: string }) => cleanUrl(`result/${path}/trades?strategy=${strategy}`)
    }),
    // file operations
    deleteResource: builder.mutation<void, string>({
      query: (path: string) => ({
        url: cleanUrl(`operation/${path}`),
        method: 'DELETE',
      }),
      invalidatesTags: ['FileTree',],
    })
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
  useGetMetaQuery,
  useGetMetricsQuery,
  useGetEquityQuery,
  useGetTradesQuery,
  // operations
  useDeleteResourceMutation,
} = trboxLabApi

export const {
  // run
  useQueryState: useRunSourceQueryState
} = trboxLabApi.endpoints.runSource

