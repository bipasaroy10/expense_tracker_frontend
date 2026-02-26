import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true   // IMPORTANT for cookies (auth middleware)
});

export default api;

