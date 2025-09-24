import axios from "axios";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

if(!VITE_BACKEND_URL) {
    console.error("env cred issue");
}

const axiosInstance = axios.create({
    baseURL: `${VITE_BACKEND_URL}/api`,
    withCredentials: true
})

export default axiosInstance