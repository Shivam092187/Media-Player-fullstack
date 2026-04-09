import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL, // Backend URL from env
});

//  TOKEN AUTO ATTACH
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// APIs
export const getAllSongs = () => API.get("/api/music");
export const playSong = (id) => API.get(`/api/music/play/${id}`);
export const registerUser = (data) => API.post("/api/auth/register", data);
export const loginUser = (data) => API.post("/api/auth/login", data);

export default API;