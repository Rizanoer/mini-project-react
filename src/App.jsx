import { Link } from "react-router-dom";

export default function App() {
  return (
    <nav style={{ padding: 10, background: "#f4f4f4" }}>
      <h2>Mini Projek</h2>
      <ul style={{ display: "flex", gap: 15, listStyle: "none", padding: 0 }}>
        <li><Link to="/">Data Pelanggan</Link></li>
        {/* <li><Link to="/products">Data Barang</Link></li>
        <li><Link to="/sales">Data Penjualan</Link></li> */}
      </ul>
      <hr />
    </nav>
  );
}
