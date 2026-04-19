import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000", // 👈 backend yahi chal raha hai
  withCredentials: false,
});

// token attach
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🎵 Music APIs
export const getAllSongs = () => API.get("/api/music");

export const playSong = (id) =>
  API.get(`/api/music/play/${id}`);

// 🔐 Auth APIs
export const registerUser = (data) =>
  API.post("/api/auth/register", data);

export const loginUser = (data) =>
  API.post("/api/auth/login", data);

export default API;