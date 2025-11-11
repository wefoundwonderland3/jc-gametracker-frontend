import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Ocultar loader inicial una vez montado React
window.addEventListener("load", () => {
  const loader = document.getElementById("boot-loader");
  if (loader) loader.style.display = "none";
});
 