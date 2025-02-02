import axios from "axios";

const API_URL = "http://localhost:3000/api" as const;

const apiClient = axios.create({
  baseURL: API_URL,
});

export { apiClient };
