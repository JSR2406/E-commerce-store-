import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://apparel-artisan-api.onrender.com/api",
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("aa_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default http;
