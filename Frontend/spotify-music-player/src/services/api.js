import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api"
});

// 🔥 TOKEN AUTO ATTACH
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ✅ APIs
export const getAllSongs = () => API.get("/music");
export const playSong = (id) => API.get(`/music/play/${id}`);

export default API;