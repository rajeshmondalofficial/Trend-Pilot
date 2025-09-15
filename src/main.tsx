import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store/index";
import { Toaster } from "./components/ui/sonner.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Theme>
          <App />
          <Toaster />
        </Theme>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
