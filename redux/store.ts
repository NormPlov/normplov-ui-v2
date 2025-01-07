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
import bookmarkReducer, { initializeBookmarks } from "./feature/jobs/bookmarkSlice";


export const makeStore = () => {
  const store = configureStore({
    reducer: {
      [normPlovApi.reducerPath]: normPlovApi.reducer,
     // [universityApi.reducerPath]: universityApi.reducer,
      auth:authSlice,
      verify: verifySlice,
      filter: filterSlice,
      jobs: jobsSlice, // Correctly add jobsSlice reducer here
      bookmarks: bookmarkReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
    .concat(normPlovApi.middleware)
    //.concat(universityApi.middleware)
  });
  // Initialize bookmarks from localStorage
  const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "{}");
  store.dispatch(initializeBookmarks(storedBookmarks));

  return store;
  
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

