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
import { resultTreeTempReducer } from './slices/resultTreeTemp'
import { themeReducer } from './slices/theme'
import { trboxLabApi } from './slices/apiSlice'



// reducers
const rootReducer = combineReducers({
  contentTemp: contentTempReducer,
  layout: layoutReducer,
  layoutTemp: layoutTempReducer,
  resultTreeTemp: resultTreeTempReducer,
  theme: themeReducer,
  [trboxLabApi.reducerPath]: trboxLabApi.reducer,
})

// store
export const store = configureStore({
  reducer: persistReducer({
    key: 'root',
    storage: storage,
    whitelist: ['layout', 'theme'],
  }, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    }).concat(trboxLabApi.middleware)
})

// persistor
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch


