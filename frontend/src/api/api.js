import axios from "axios";

// En Docker + Nginx → on passe TOUJOURS par /api
const API = axios.create({
  baseURL: "/api",
});

// 🔐 Inject token automatiquement pour toutes les requêtes
API.interceptors.request.use(
  (config) => {
    // Ajouter le token si présent (même pour /analyze-face pour sauvegarder)
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔐 Auth
export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);

// 🤖 Prediction (avec authentification - sauvegarde en DB)
export const predictEmotion = (formData) =>
  API.post("/predict", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// 🤖 Analyse rapide (sans authentification - pas de sauvegarde)
export const analyzeFace = (formData) =>
  API.post("/analyze-face", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// 📜 Historique
export const getHistory = () =>
  API.get("/history");

export default API;
