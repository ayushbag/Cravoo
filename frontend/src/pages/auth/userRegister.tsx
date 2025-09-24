import { toast } from "sonner"
import AuthCard from "../../components/authCard"
import { authContent } from "../../constants/authContent"
import AuthLayout from "../../layouts/authLayout"
import axiosInstance from "../../services/axios"
import { useNavigate } from "react-router-dom"

const UserRegister = () => {
    
    const navigate = useNavigate();

    const handleSubmit = async (data: Record<string, FormDataEntryValue>) => {
        try {
            const res = await axiosInstance.post("/auth/user/register", data);
            toast.error( res.data.message || "register success!")
            navigate("/");
        } catch (err : any) {
            toast.error(err.response?.data.errors || err.response?.data.message || err.message);
        }   
    }

    return (
        <AuthLayout>
            <AuthCard
                role="user"
                type="register"
                cardTitle={authContent.user.register.title}
                cardDescription={authContent.user.register.desc}
                onSubmit={handleSubmit}
            />
        </AuthLayout>
    )
}

export default UserRegister