import axios from "axios";

const api = axios.create({
  baseURL: "/api", // Ubah jadi hanya "/api"
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
