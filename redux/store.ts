// import { configureStore } from '@reduxjs/toolkit'
// import { normPlovApi } from './api'
// import authSlice from './feature/auth/authSlice'
// import verifySlice from './feature/verify/verifySlice'
// export const makeStore = () => {
//   return configureStore({
//     reducer: {
//       [normPlovApi.reducerPath]:normPlovApi.reducer,
//       auth: authSlice,
//       verify: verifySlice,
      
//     },
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(normPlovApi.middleware),
//   })
// }

// // Infer the type of makeStore
// export type AppStore = ReturnType<typeof makeStore>
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<AppStore['getState']>
// export type AppDispatch = AppStore['dispatch']

import { configureStore } from '@reduxjs/toolkit';
import { normPlovApi } from './api';
import authSlice from './feature/auth/authSlice';
import verifySlice from './feature/verify/verifySlice';
import filterSlice from './feature/filter/filterSlice';
import jobsSlice from "./feature/jobs/jobsSlice"; // Import the jobs slice
import bookmarkReducer from "./feature/jobs/bookmarkSlice";
import localeReducer from "@/redux/feature/localeSlice/localeSlice";
import { setLocale } from "@/redux/feature/localeSlice/localeSlice";
import tokenSlice from './feature/auth/authSlice';

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      [normPlovApi.reducerPath]: normPlovApi.reducer,
     // [universityApi.reducerPath]: universityApi.reducer,
      auth:authSlice,
      token:tokenSlice,
      verify: verifySlice,
      filter: filterSlice,
      jobs: jobsSlice, // Correctly add jobsSlice reducer here
      bookmarks: bookmarkReducer,
      locale: localeReducer, // Add the locale slice here
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
    .concat(normPlovApi.middleware)
    //.concat(universityApi.middleware)
  });
  


  // Load locale from localStorage if available
  const savedLocale =
    typeof window !== "undefined" ? localStorage.getItem("locale") : null;
  if (savedLocale) {
    store.dispatch(setLocale(savedLocale));
  }
  return store;
  
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

