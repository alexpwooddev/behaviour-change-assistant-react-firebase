import React from "react";
import ReactDOM from "react-dom";
import store from "./app/store";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import { LanguageProvider } from "./containers/Language";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
