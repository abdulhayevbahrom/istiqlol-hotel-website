import { configureStore } from '@reduxjs/toolkit';
import { websiteApi } from './websiteApi';

export const store = configureStore({
  reducer: {
    [websiteApi.reducerPath]: websiteApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(websiteApi.middleware),
});
