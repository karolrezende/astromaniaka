import axios from "axios";

const baseURL = axios.create({
  // baseURL: "https://astroserver-8sv2.onrender.com",
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3001",
});

export default baseURL;
