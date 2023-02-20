import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type ResultMeta = {
  [key: string]: string
}

export const trboxLabApi = createApi({
  reducerPath: 'trboxLabApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: builder => ({
    getResultMeta: builder.query<ResultMeta, string>({
      query: (path: string) => `result/${path}`
    })
  })
})

export const { useGetResultMetaQuery } = trboxLabApi
