import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./global.css";
import { ContextProvider } from "./context/AuthContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { MenuProvider } from "./context/MenuContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider >
        <ContextProvider>
          <MenuProvider>

            <App />

          </MenuProvider>
        </ContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
