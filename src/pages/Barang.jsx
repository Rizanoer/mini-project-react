import { useState, useEffect } from "react";
import api from "../api";
import "./../styles.css";

export default function App() {
  const [barangs, setBarangs] = useState([]);
  const [form, setForm] = useState({ kode: "", nama: "", kategori: "", harga: "" });
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState("tambah");
  const [kode, setKode] = useState("");

  useEffect(() => {
    api.get("/barangs")
      .then((response) => {
        console.log("Response dari API:", response.data);
        setBarangs(response.data.barangs);
        setKode(response.data.kode);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (status === "tambah") {
      setForm((prevForm) => ({ ...prevForm, kode }));
    }
  }, [status, kode]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await api.put(`/barangs/${form.kode}`, form);
        setBarangs(barangs.map((p) => (p.kode === form.kode ? form : p)));
      } else {
        const response = await api.post("/barangs", form);
        setBarangs([...barangs, response.data.data]);
        setKode(response.data.kode);
        
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
      const response = await api.delete(`/barangs/${id}`);
      setBarangs(barangs.filter((p) => p.kode !== id));
      setKode(response.data.kode);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const resetForm = () => {
    setForm({ kode: kode, nama: "", kategori: "", harga: "" });
    setEditMode(false);
  };

  return (
    <div className="container">
      <h2>Data Barang</h2>
      <section style={{ marginBottom: 30 }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label htmlFor="kode">Kode:</label>
            <input 
              id="kode"
              name="kode"
              placeholder="Kode"
              value={form.kode}
              onChange={handleChange}
              required
              readOnly
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label htmlFor="nama">Nama:</label>
            <input 
              id="nama"
              name="nama"
              placeholder="Nama"
              value={form.nama}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label htmlFor="kategori">Kategori:</label>
            <input 
              id="kategori"
              name="kategori"
              placeholder="Kategori"
              value={form.kategori}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label htmlFor="harga">Harga:</label>
            <input 
              id="harga"
              type="number"
              name="harga"
              placeholder="0"
              value={form.harga}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
            <button type="submit">{editMode ? "Update" : "Tambah"} Barang</button>
            {editMode && <button type="button" onClick={resetForm}>Batal</button>}
          </div>
        </form>
      </section>
      <table>
        <thead>
          <tr>
            <th>Kode</th>
            <th>Nama</th>
            <th>Kategori</th>
            <th>Harga</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {barangs.map((p) => (
            <tr key={p.id}>
              <td>{p.kode}</td>
              <td>{p.nama}</td>
              <td>{p.kategori}</td>
              <td>{p.harga}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p.kode)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
