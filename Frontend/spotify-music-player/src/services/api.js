import axios from "axios";

//  Backend URL from .env (local or live)
const API = axios.create({
  baseURL: import.meta.env.REACT_APP_API_UR || "https://media-player-fullstack-1.onrender.com/api/auth",
  withCredentials: true, // 🔥 cookie support for cross-domain
});

// 🔥 Attach token automatically if exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//  Auth APIs
export const registerUser = (data) => API.post("/register", data);
export const loginUser = (data) => API.post("/login", data);
export const getMe = () => API.get("/me");

// Music APIs
export const getAllSongs = () => API.get("/music");
export const playSong = (id) => API.get(`/music/play/${id}`);

export default API;