import axios from "axios";
import { demoAdapter } from "@/demo/mockApi";

// Na branch demo as requisições são respondidas pela API simulada no navegador
// (src/demo/mockApi.ts), com dados fictícios. Para usar o Astroserver de verdade,
// defina VITE_DEMO_API=real no .env.local.
const useRealApi = import.meta.env.VITE_DEMO_API === "real";

const baseURL = axios.create({
  // baseURL: "https://astroserver-8sv2.onrender.com",
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3001",
  ...(useRealApi ? {} : { adapter: demoAdapter }),
});

export default baseURL;
