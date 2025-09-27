import axios from "axios";

// /src/lib/api.ts
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export default API;
