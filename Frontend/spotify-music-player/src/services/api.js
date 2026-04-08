import axios from "axios";


const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // use env variable
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
export const registerUser = (data) => API.post("/user/register", data);
export const loginUser = (data) => API.post("/user/login", data);

export default API;