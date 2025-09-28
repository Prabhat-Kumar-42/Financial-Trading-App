import axios from "axios";

// /src/lib/api.ts
const rawBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
let base = rawBase.replace(/\/$/, ""); // strip trailing slash

if (!base.endsWith("/api")) {
  base = base + "/api";
}

const API = axios.create({
  baseURL: base,
});

export default API;
