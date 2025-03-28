import { useState, useEffect } from "react";
import api from "../api";
import "./../styles.css";

export default function App() {
  const [penjualans, setPenjualans] = useState([]);
  const [pelanggans, setPelanggans] = useState([]);
  const [barangs, setBarangs] = useState([]);
  const [form, setForm] = useState({ id_nota: "", tgl: new Date().toISOString().split("T")[0], kode_pelanggan: "", kode_barang: "", qty: "" });
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState("tambah");
  const [id_nota, setIdNota] = useState("");

  useEffect(() => {
    api.get("/penjualans")
      .then((response) => {
        console.log("Response dari API:", response.data);
        setPelanggans(response.data.pelanggans);
        setBarangs(response.data.barangs);
        setIdNota(response.data.id_nota);
        setPenjualans(response.data.penjualans);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (status === "tambah") {
      setForm((prevForm) => ({ ...prevForm, id_nota }));
    }
  }, [status, id_nota]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await api.put(`/penjualans/${form.id_nota}`, form);
        setPenjualans(penjualans.map((p) => (p.id_nota === form.id_nota ? form : p)));
      } else {
        const response = await api.post("/penjualans", form);
        console.log(response);
        console.log(response.data.penjualans);
        setPenjualans(response.data.penjualans);
        setIdNota(response.data.id_nota);
        
      }
      resetForm();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleEdit = (pelanggan) => {
    setForm(pelanggan);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/penjualans/${id}`);
      setPenjualans(penjualans.filter((p) => p.id_nota !== id));
      setIdNota(response.data.id_nota);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const resetForm = () => {
    setForm({ id_nota: id_nota, tgl: "", kode_pelanggan: "", kode_barang: "", qty: 0 });
    setEditMode(false);
  };

  return (
    <div className="container">
      <h2>Data Penjualan</h2>
      <section style={{ marginBottom: 30 }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {/* ID Nota */}
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label htmlFor="id_nota">ID Nota:</label>
            <input 
              id="id_nota"
              name="id_nota"
              placeholder="ID Nota"
              value={form.id_nota}
              onChange={handleChange}
              required
              readOnly
            />
          </div>

          {/* Tanggal */}
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label htmlFor="tgl">Tanggal:</label>
            <input 
              id="tgl"
              type="date"
              name="tgl"
              value={form.tgl}
              onChange={handleChange}
              required
            />
          </div>

          {/* Nama Pelanggan */}
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label htmlFor="kode_pelanggan">Nama Pelanggan:</label>
            <select
              id="kode_pelanggan"
              name="kode_pelanggan"
              value={form.kode_pelanggan}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Pilih Pelanggan</option>
              {pelanggans?.map((a) => (
                <option key={a.id_pelanggan} value={a.id_pelanggan}>
                  {a.nama}
                </option>
              ))}
            </select>
          </div>

          {/* Nama Barang */}
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label htmlFor="kode_barang">Nama Barang:</label>
            <select
              id="kode_barang"
              name="kode_barang"
              value={form.kode_barang}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Pilih Barang</option>
              {barangs?.map((a) => (
                <option key={a.kode} value={a.kode}>
                  {a.nama}
                </option>
              ))}
            </select>
          </div>

          {/* Qty */}
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label htmlFor="qty">Qty:</label>
            <input 
              id="qty"
              type="number"
              name="qty"
              value={form.qty}
              onChange={handleChange}
              required
            />
          </div>

          {/* Tombol Aksi */}
          <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
            <button type="submit">{editMode ? "Update" : "Tambah"} Nota</button>
            {editMode && <button type="button" onClick={resetForm}>Batal</button>}
          </div>
        </form>
      </section>
      <table>
        <thead>
          <tr>
            <th>ID Nota</th>
            <th>Tanggal</th>
            <th>Pelanggan</th>
            <th>Barang</th>
            <th>Harga</th>
            <th>Qty</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {penjualans.map((p) => (
            <tr key={p.id}>
              <td>{p.id_nota}</td>
              <td>{p.tgl}</td>
              <td>{p.nama_pelanggan}</td>
              <td>{p.nama_barang}</td>
              <td>{p.harga}</td>
              <td>{p.qty}</td>
              <td>{p.subtotal}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p.id_nota)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
