import axios from "axios";

export const axiosInstance = axios.create({
     baseURL: import.meta.env.MODE==="development" ? "http://localhost:5001/api":"/api",
     withCredentials: true, // Allow sending credentials like cookies or authorization headers
 });