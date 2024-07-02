import { configureStore,combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from "./ApiSlices/authSlice";
import profileSlice from "./ApiSlices/profileSlice";


const persistAuthConfig = {
    key: 'auth',
    storage,
    whitelist:["user"]
  }

  const persistedAuthReducer = persistReducer(persistAuthConfig, authSlice)


  const reducer=combineReducers({
    auth:persistedAuthReducer,
    profile:profileSlice
  });

export const store=configureStore({
    reducer:{
        reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: false,
       })
});

export const persistor = persistStore(store);