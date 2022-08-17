import axios from "axios";

// const baseURL = "http://localhost:8001"
// export const baseURL = "http://localhost:8001"
export const baseURL = "http://192.168.100.8:8001"
const instance = axios.create({baseURL:baseURL});
export default instance;