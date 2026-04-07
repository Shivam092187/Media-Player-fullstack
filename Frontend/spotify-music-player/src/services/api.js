import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

// 🔐 Token auto attach
API.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ================= AUTH =================
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

// ================= MUSIC =================

// 🎵 Upload
export const createMusic = (data) =>
  API.post("/music/upload", data, {
    headers: { "Content-Type": "multipart/form-data" }
  });

// 🎵 Get all songs
export const getAllSongs = () => API.get("/music");

// 🔥 NEW: Play song (IMPORTANT)
export const playSong = (id) => API.get(`/music/play/${id}`);

// 🔥 NEW: Analytics
export const getAnalytics = () => API.get("/music/analytics");

export default API;