import { FileNode } from '@/common/types'
import { cleanUrl } from '@/common/utils'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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

export type RunResult = {
  source: string,
  stdout: string,
  stderr: string,
}

export const trboxLabApi = createApi({
  reducerPath: 'trboxLabApi',
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: builder => ({
    runSource: builder.query<RunResult, string>({
      query: (path: string) => cleanUrl(`run/${path}`)
    }),
    testWS: builder.query<string[], void>({
      query: () => 'wsinit',
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // create a websocket connection when the cache subscription starts
        const ws = new WebSocket(`ws://${window.location.host}/api/ws`)
        console.debug('ws connected, waiting cacheDataLoaded')
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded
          console.debug('ws init request resoved, listening to ws message updates')
          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message
          const listener = (event: MessageEvent) => {
            console.debug(event)
            // const data: string = JSON.parse(event.data)
            const data: string = event.data
            // if (!isMessage(data) || data.channel !== arg) return

            updateCachedData((draft) => {
              draft.push(data)
            })
          }

          ws.addEventListener('message', listener)
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
          console.log('here? exception')
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        ws.close()
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
    getMetrics: builder.query<Metrics, string>({
      query: (path: string) => cleanUrl(`result/${path}/metrics`)
    }),
    getEquity: builder.query<Equities, string>({
      query: (path: string) => cleanUrl(`result/${path}/equity`)
    }),
  }),
})

export const {
  useLazyTestWSQuery,
  useLazyRunSourceQuery,
  useGetSourceTreeQuery,
  useGetSourceQuery,
  useGetResultTreeQuery,
  useGetMetricsQuery,
  useGetEquityQuery,
} = trboxLabApi

export const {
  useQueryState: useRunSourceQueryState
} = trboxLabApi.endpoints.runSource

