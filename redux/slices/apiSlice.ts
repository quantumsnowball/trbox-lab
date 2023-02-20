import { TreeDict } from '@/common/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type ResultMeta = {
  [key: string]: string
}

export const trboxLabApi = createApi({
  reducerPath: 'trboxLabApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: builder => ({
    getSourceTree: builder.query<TreeDict, void>({ query: () => `tree/source` }),
    getSource: builder.query<string, string>({ query: (path: string) => `source/${path}` }),
    getResultMeta: builder.query<ResultMeta, string>({ query: (path: string) => path }),
  })
})

export const {
  useGetSourceTreeQuery,
  useGetSourceQuery,
  useGetResultMetaQuery
} = trboxLabApi
