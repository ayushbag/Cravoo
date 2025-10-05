import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import axiosInstance from "../services/axios";

type User = {
    _id: string;
    fullName?: string;
    email?: string;
    name?: string;
    contactName?: string;
    phone?: string;
    createdAt: string;
    updatedAt: string;
}

type AuthContextType = {
    user: User | null;
    role: "user" | "foodpartner" | null;
    loading: boolean;
    error: any;
    isAuthenticated: boolean;
    refreshAuth: () => Promise<void>;
};


const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [role, setRole] = useState<"user" | "foodpartner" | null>(null);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchUser = async () => {
        try {
            setLoading(true)
            const currentUser = await axiosInstance.get("/auth/me");

            const { user, role } = currentUser.data;
            if (user && role) {
                setUser(user);
                setRole(role);
            }
        } catch (err: any) {
            console.error("Fetch user failed:", err);
            setError(err)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    // **WAIT** for auth to be loaded before returning context
    if (loading) {
        return;
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                role,
                loading,
                error,
                isAuthenticated: !!user,
                refreshAuth: fetchUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
}