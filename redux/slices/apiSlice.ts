import { Node } from '@/common/types'
import { cleanUrl } from '@/common/utils'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type ResultMeta = {
  [key: string]: string
}

export type RunResult = {
  source: string,
  stdout: string,
}

export const trboxLabApi = createApi({
  reducerPath: 'trboxLabApi',
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: builder => ({
    runSource: builder.query<RunResult, string>({
      query: (path: string) => cleanUrl(`run/${path}`)
    }),
    getSourceTree: builder.query<Node, void>({
      query: () => `tree/source`
    }),
    getSource: builder.query<string, string>({
      query: (path: string) => ({
        url: cleanUrl(`source/${path}`),
        responseHandler: 'text'
      }),
    }),
    getResultTree: builder.query<Node, void>({
      query: () => `tree/result`
    }),
    getResult: builder.query<ResultMeta, string>({
      query: (path: string) => cleanUrl(`result/${path}/meta.json`)
    }),
  }),
})

export const {
  useRunSourceQuery,
  useLazyRunSourceQuery,
  useGetSourceTreeQuery,
  useGetSourceQuery,
  useGetResultTreeQuery,
  useGetResultQuery,
} = trboxLabApi
