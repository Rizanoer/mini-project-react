import { useState, useEffect } from "react";
import api from "./../api";
import "./../styles.css";

export default function App() {
  const [pelanggans, setPelanggans] = useState([]);
  const [form, setForm] = useState({ id_pelanggan: "", nama: "", domisili: "", jenis_kelamin: "" });
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState("tambah");
  const [id_pelanggan, setIdPelanggan] = useState("");


  // Ambil data pelanggan dari Laravel API
  useEffect(() => {
    api.get("/pelanggans")
      .then((response) => {
        console.log("Response dari API:", response.data); // Debugging
        setPelanggans(response.data.pelanggans); // Simpan ke state
        setIdPelanggan(response.data.id_pelanggan);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (status === "tambah") {
      setForm((prevForm) => ({ ...prevForm, id_pelanggan }));
    }
  }, [status, id_pelanggan]);

  // Fungsi untuk menangani input form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Fungsi untuk menambah atau mengupdate pelanggan
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await api.put(`/pelanggans/${form.id_pelanggan}`, form);
        setPelanggans(pelanggans.map((p) => (p.id_pelanggan === form.id_pelanggan ? form : p)));
      } else {
        const response = await api.post("/pelanggans", form);
        setPelanggans([...pelanggans, response.data.data]);
        setIdPelanggan(response.data.id_pelanggan);
        
      }
      resetForm();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // Fungsi untuk edit data pelanggan
  const handleEdit = (pelanggan) => {
    setForm(pelanggan);
    setEditMode(true);
  };

  // Fungsi untuk menghapus pelanggan
  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/pelanggans/${id}`);
      setPelanggans(pelanggans.filter((p) => p.id_pelanggan !== id));
      setIdPelanggan(response.data.id_pelanggan);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  // Reset form setelah submit
  const resetForm = () => {
    setForm({ id_pelanggan: id_pelanggan, nama: "", domisili: "", jenis_kelamin: "" });
    setEditMode(false);
  };

  return (
    <div className="container">
      <h2>Data Pelanggan</h2>
      <section style={{ marginBottom: 30 }}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>ID Pelanggan: </label>
            <input 
              name="id_pelanggan"
              placeholder="ID Pelanggan"
              value={form.id_pelanggan}
              onChange={handleChange} required readOnly
            />
          </div>
          <div>
            <label>Nama: </label>
            <input name="nama" placeholder="Nama" value={form.nama} onChange={handleChange} required />
          </div>
          <div>
            <label>Domisili: </label>
            <input name="domisili" placeholder="Domisili" value={form.domisili} onChange={handleChange} required />
          </div>
          <div>
            <label>Jenis Kelamin: </label>
            <label>
              <input
                type="radio"
                name="jenis_kelamin"
                value="PRIA"
                checked={form.jenis_kelamin === "PRIA"}
                onChange={handleChange}
              />
              PRIA
            </label>

            <label>
              <input
                type="radio"
                name="jenis_kelamin"
                value="WANITA"
                checked={form.jenis_kelamin === "WANITA"}
                onChange={handleChange}
              />
              WANITA
            </label>
          </div>
          <div>
            <button type="submit" style={{ marginTop: 10 }}>{editMode ? "Update" : "Tambah"} Pelanggan</button>
            {editMode && <button onClick={resetForm}>Batal</button>}
          </div>
        </form>
      </section>

      <table>
        <thead>
          <tr>
            <th>ID Pelanggan</th>
            <th>Nama</th>
            <th>Domisili</th>
            <th>Jenis Kelamin</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pelanggans.map((p) => (
            <tr key={p.id}>
              <td>{p.id_pelanggan}</td>
              <td>{p.nama}</td>
              <td>{p.domisili}</td>
              <td>{p.jenis_kelamin}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p.id_pelanggan)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
