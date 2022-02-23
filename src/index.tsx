import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import "./sass/main.scss";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./store/root-reducer";
import { Provider } from "react-redux";
import httpClient from "./services/http-client";
import { saveState, loadState } from "./utils/local-storage";

const preloadedState = { DATA: loadState()?.state };

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: httpClient,
      },
    }),
});

store.subscribe(() => {
  saveState({
    state: store.getState().DATA,
  });
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
