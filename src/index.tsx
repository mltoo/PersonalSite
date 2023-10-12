
import { createRoot } from "react-dom/client"; 
import * as React from "react";
import { App } from "./App";
import "@fontsource/clear-sans/700.css";
import "@fontsource/clear-sans";

const container = document.getElementById("react-container");
if (container != null) {
    const root = createRoot(container);
    root.render(<React.StrictMode><App/></React.StrictMode>);
} else {
    console.error("Could not get 'react-container' element!");
}
