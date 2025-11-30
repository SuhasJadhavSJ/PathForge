import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/api",
  timeout: 20000,
});

instance.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default instance;
