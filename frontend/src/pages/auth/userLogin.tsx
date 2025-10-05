import { toast } from "sonner"
import AuthCard from "../../components/authCard"
import { authContent } from "../../constants/authContent"
import AuthLayout from "../../layouts/authLayout"
import axiosInstance from "../../services/axios"
import { useNavigate } from "react-router-dom"

const UserLogin = () => {

    const navigate = useNavigate()

    const handleSubmit = async (data: Record<string, FormDataEntryValue>) => {
        try {
            const res = await axiosInstance.post("/auth/user/login", data);
            toast.success(res.data.message || "User login success!");
            navigate("/")
        } catch (err: any) {
            toast.error(err.response?.data.errors || err.response?.data.message || err.message);
            console.error(err)
        }
    }

    return (
        <AuthLayout>
            <AuthCard
                role="user"
                type="login"
                cardTitle={authContent.user.login.title}
                cardDescription={authContent.user.login.desc}
                onSubmit={handleSubmit}
            />
        </AuthLayout>
    )
}

export default UserLogin