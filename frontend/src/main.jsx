import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ModalProvider } from "./store/ModalProvider.jsx";
import Navbar from "./components/common/Navbar.jsx";
import BottomNavbar from "./components/common/BottomNavbar.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <Navbar/>
    <App />
  </React.StrictMode>
);
