import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";
import type { ReactNode } from "react";
import { useAuth } from "../../context/authContext";

const ProtectedRoute = ({ allowedRoles }: {
    allowedRoles: ("user" | "foodpartner")[]
}):ReactNode | Promise<ReactNode> => {
    const { isAuthenticated, role, loading } = useAuth();

    if(loading){ 
        console.log("loading");
    }

    if(!isAuthenticated) {
        toast.error("You need to log in first!")
        return <Navigate to="/user/login" replace />;
    }

    if(allowedRoles.length && !allowedRoles.includes(role!)) {
        toast.error("Unauthorized access!")
        return <Navigate to="/unauthorized" replace />;
    }

  return <Outlet />
}

export default ProtectedRoute