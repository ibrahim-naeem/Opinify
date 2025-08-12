import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MainContextProvider } from "./Context/MainContextProvider";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MainContextProvider>
      <App />
    </MainContextProvider>
  </StrictMode>
);
