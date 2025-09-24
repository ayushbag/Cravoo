import axios from "axios"

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const authService = {
    register: async (role: "user" | "food-partner", data: any) => {
        const res = await axios.post(`${VITE_BACKEND_URL}/api/auth/${role}/register`, {
            data
        })
    }
}

// /api/auth/user/register