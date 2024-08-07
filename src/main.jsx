import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { persistor, store } from "./Redux/index.js";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";


ReactDOM.createRoot(document.getElementById('root')).render(

  <React.Fragment>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
     <App />
      </PersistGate>
    </Provider>
  </React.Fragment>
);
