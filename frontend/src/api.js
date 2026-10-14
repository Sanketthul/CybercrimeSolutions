import axios from "axios";

const API_BASE_URL = (process.env.REACT_APP_API_URL || "http://localhost:4000").replace(/\/$/, "");
const api = axios.create({ baseURL: API_BASE_URL, timeout: 15000, headers: { "Content-Type": "application/json" } });
api.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
api.interceptors.response.use((response) => response, (error) => {
  if (error.response?.status === 401 && window.localStorage.getItem("token")) {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("loggedIn");
  }
  return Promise.reject(error);
});
export default api;
