
import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL: "http://127.0.0.1:4080/api",
  
});

export default api;
