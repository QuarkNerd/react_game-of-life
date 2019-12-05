import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const rootElement = document.getElementById("root");
ReactDOM.render(<App numRows={20} numColumns={20} />, rootElement);
registerServiceWorker();
