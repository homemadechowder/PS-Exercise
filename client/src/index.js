import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const mainApp = (
    <App />
)

ReactDOM.render(mainApp, document.getElementById("root"));
registerServiceWorker();
