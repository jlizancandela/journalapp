import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { ThemeProvider } from "./themes";
import { JournalApRouter } from "./routes";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <JournalApRouter />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
