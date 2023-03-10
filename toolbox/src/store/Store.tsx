import { configureStore } from '@reduxjs/toolkit'
import AdFiltersReducer from "./AdFiltersReducer";

export const store = configureStore({
  reducer: {
    AdFilters: AdFiltersReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch