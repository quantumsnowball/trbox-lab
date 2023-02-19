import { TreeDict } from '@/common/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const layoutTempSlice = createSlice({
  name: 'layoutTemp',
  initialState: {
    menu: {
      visible: false,
    },
    breadCrumbs: {
      dirTree: {} as TreeDict,
      nodes: [] as string[],
    }
  },
  reducers: {
    // menu
    toggleMenu: s => { s.menu.visible = !s.menu.visible },
    openMenu: s => { s.menu.visible = true },
    closeMenu: s => { s.menu.visible = false },
    // breadCrumbs
    setDirTree: (s, a: PayloadAction<TreeDict>) => { s.breadCrumbs.dirTree = a.payload },
    clearDirTree: s => { s.breadCrumbs.dirTree = {} },
    setNodes: (s, a: PayloadAction<string[]>) => { s.breadCrumbs.nodes = a.payload },
    appendNode: (s, a: PayloadAction<string>) => { s.breadCrumbs.nodes.push(a.payload) },
    popNode: s => { s.breadCrumbs.nodes.pop() },
    clearNodes: s => { s.breadCrumbs.nodes = [] },
  }
})

export const layoutTempActions = layoutTempSlice.actions

export const layoutTempReducer = layoutTempSlice.reducer


