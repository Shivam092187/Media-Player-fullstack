import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// token attach
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const getAllSongs = () => {
  return API.get("/api/music");
};

export const playSong = (id) => {
  return API.get(`/api/music/play/${id}`);
};

export const registerUser = (data) => {
  return API.post("/api/auth/register", data);
};

export const loginUser = (data) => {
  return API.post("/api/auth/login", data);
};

export default API;