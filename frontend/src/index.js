import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'
import { TranslationProvider } from "./context/TranslationContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <TranslationProvider>
        <App />
    </TranslationProvider>
);
