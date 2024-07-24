import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./ApiSlices/authSlice";
import profileSlice from "./ApiSlices/profileSlice";
import statisticsSlice from "./ApiSlices/statisticsSlice";

const persistAuthConfig = {
  key: "auth",
  storage,
  whitelist: ["user"],
};

const persistedAuthReducer = persistReducer(persistAuthConfig, authSlice);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  profile: profileSlice,
  statistics:statisticsSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
