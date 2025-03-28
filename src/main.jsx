import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Pelanggan from "./pages/Pelanggan";
import Barang from "./pages/Barang";
import Penjualan from "./pages/Penjualan";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <App />
      <Routes>
        <Route path="/" element={<Pelanggan />} />
        <Route path="/barangs" element={<Barang />} />
        <Route path="/penjualans" element={<Penjualan />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
