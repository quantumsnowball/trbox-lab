import { TreeDict, Node } from '@/common/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type ResultMeta = {
  [key: string]: string
}

type Source = {
  code: string
}

export const trboxLabApi = createApi({
  reducerPath: 'trboxLabApi',
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: builder => ({
    getSourceTree: builder.query<Node, void>({ query: () => `tree/source` }),
    getSource: builder.query<Source, string>({ query: (path: string) => `source/${path}` }),
    getResultMeta: builder.query<ResultMeta, string>({ query: (path: string) => path }),
  }),
})

export const {
  useGetSourceTreeQuery,
  useGetSourceQuery,
  useGetResultMetaQuery
} = trboxLabApi
