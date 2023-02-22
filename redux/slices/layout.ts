import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    menuDrawer: {
      pages: {
        expanded: true,
      },
      settings: {
        expanded: false,
      },
      about: {
        expanded: false,
      }
    },
    lastPath: {
      source: '',
      result: '',
    },
  },
  reducers: {
    togglePages: s => {
      s.menuDrawer.pages.expanded = !s.menuDrawer.pages.expanded
    },
    toggleSettings: s => {
      s.menuDrawer.settings.expanded = !s.menuDrawer.settings.expanded
    },
    toggleAbout: s => {
      s.menuDrawer.about.expanded = !s.menuDrawer.about.expanded
    },
    setSourceLastPath: (s, a: PayloadAction<string | undefined>) => {
      s.lastPath.source = a.payload ?? ''
    },
    setResultLastPath: (s, a: PayloadAction<string | undefined>) => {
      s.lastPath.result = a.payload ?? ''
    },
  }
})

export const layoutActions = layoutSlice.actions

export const layoutReducer = layoutSlice.reducer


