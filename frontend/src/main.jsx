import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Header from "./components/common/Header.jsx";
import BottomAppBar from "./components/common/BottomAppBar.jsx";
import { ModalProvider } from "./store/ModalProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <Header/> */}
    <App />
  </React.StrictMode>
);
