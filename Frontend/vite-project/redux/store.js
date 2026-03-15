import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import companySlice from "./companySlice"
import ApplicationSlice from "./ApplicationSlice"

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "company", "job"] // only auth will persist
};

const rootReducer = combineReducers({
  auth: authSlice,
  job: jobSlice,
  company:companySlice,
  application:ApplicationSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export const persistor = persistStore(store);



// Before persist:

// Login
// ↓
// Redux user stored
// ↓
// Refresh page
// ↓
// user = null ❌


// After persist:

// Login
// ↓
// Redux user stored
// ↓
// Saved in localStorage
// ↓
// Refresh page
// ↓
// Redux restores user automatically ✅