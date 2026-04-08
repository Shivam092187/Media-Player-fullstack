import axios from "axios";


const API = axios.create({
  baseURL: "https://media-player-fullstack.onrender.com/api",
  withCredentials: true // agar cookies/token backend se bhej rahe ho
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