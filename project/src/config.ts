// project/src/config.ts

const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://127.0.0.1:5000"
    : "https://aistudubudy-backend.onrender.com";

export default API_BASE_URL;
