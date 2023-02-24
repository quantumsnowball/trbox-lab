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

