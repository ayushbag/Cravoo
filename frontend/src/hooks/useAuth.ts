// import { useEffect, useState } from "react"
// import axiosInstance from "../services/axios";

// export const useAuth = () => {
//     const [user, setUser] = useState(null);
//     const [role, setRole] = useState(null);
//     const [loading, setLoading] = useState(false)
//     const [error, setError] = useState<any | null>(null)

//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 setLoading(true)
//                 const currentUser = await axiosInstance.get("/auth/me");
                
//                 const { user, role } = currentUser.data;
//                 if(user && role) {
//                     console.log("Ho from the");
//                     setUser(user);
//                     setRole(role);
//                 }
    
//                 console.log("user from {}: ", user);
//             } catch (err) {
//                 console.error("❌ Fetch user failed:", err);
//                 setError(err)
//             }
//         }
        
//         fetchUser()
//     }, [])

//     console.log("user from outside: ", user);

//     return {
//         user,
//         loading,
//         role, 
//         error,
//         isAuthenticated: !!user
//     }
// }