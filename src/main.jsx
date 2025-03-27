import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Pelanggan from "./pages/Pelanggan";
// import Products from "./pages/Products";
// import Sales from "./pages/Sales";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <App />
      <Routes>
        <Route path="/" element={<Pelanggan />} />
        {/* <Route path="/products" element={<Products />} />
        <Route path="/sales" element={<Sales />} /> */}
      </Routes>
    </Router>
  </React.StrictMode>
);
