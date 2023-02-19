import { TreeDict } from '@/common/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const resultTreeTempSlice = createSlice({
  name: 'resultTreeTemp',
  initialState: {
    dirTree: {} as TreeDict,
    nodes: [] as string[],
  },
  reducers: {
    setDirTree: (s, a: PayloadAction<TreeDict>) => { s.dirTree = a.payload },
    clearDirTree: s => { s.dirTree = {} },
    setNodes: (s, a: PayloadAction<string[]>) => { s.nodes = a.payload },
    shortenNodes: (s, a: PayloadAction<number>) => { s.nodes = s.nodes.slice(0, a.payload) },
    appendNode: (s, a: PayloadAction<string>) => { s.nodes.push(a.payload) },
    popNode: s => { s.nodes.pop() },
    clearNodes: s => { s.nodes = [] },
  }
})

export const resultTreeTempActions = resultTreeTempSlice.actions

export const resultTreeTempReducer = resultTreeTempSlice.reducer



