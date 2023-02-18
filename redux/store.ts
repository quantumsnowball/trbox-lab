import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import {
  persistReducer, persistStore,
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { contentTempReducer } from './slices/contentTemp'
import { layoutReducer } from './slices/layout'
import { layoutTempReducer } from './slices/layoutTemp'
import { themeReducer } from './slices/theme'


// reducers
const rootReducer = combineReducers({
  contentTemp: contentTempReducer,
  layout: layoutReducer,
  layoutTemp: layoutTempReducer,
  theme: themeReducer
})

// store
export const store = configureStore({
  reducer: persistReducer({
    key: 'root',
    storage: storage,
    blacklist: [
      'contentTemp',
      'layoutTemp',
    ]
  }, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    })
})

// persistor
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch


