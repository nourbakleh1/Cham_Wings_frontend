import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./ApiSlices/authSlice";
import profileSlice from "./ApiSlices/profileSlice";
import flightSlice from "./ApiSlices/flightSlice";
import statisticsSlice from "./ApiSlices/statisticsSlice";
import chatbotSlice from "./ApiSlices/employee/chatbotSlice";
import adminSlice from "./ApiSlices/admin/adminSlice";
import manageFlightsSlice from "./ApiSlices/employee/manageFlightsSlice";
import airportSlice from "./ApiSlices/employee/airportSlice";
import ManageAirplanesSlice from "./ApiSlices/employee/ManageAirplanesSlice";
import readReservationSlice from "./ApiSlices/employee/readReservationSlice";
import sessionStorage from 'redux-persist/lib/storage/session'


const persistAuthConfig = {
  key: "auth",
  storage,
  whitelist: ["user"],
};
const persistFlightConfig = {
  key: "flight",
  storage:sessionStorage,
  whitelist: ["resultSearch"],
};

const persistedAuthReducer = persistReducer(persistAuthConfig, authSlice);
const persistedFlightReducer = persistReducer(persistFlightConfig, flightSlice);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  profile: profileSlice,
  flights: persistedFlightReducer,
  statistics:statisticsSlice,
  chatbot:chatbotSlice,
  admin:adminSlice,
  manage_flights:manageFlightsSlice,
  airports:airportSlice,
  airplanes:ManageAirplanesSlice,
  read_reservation:readReservationSlice
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
