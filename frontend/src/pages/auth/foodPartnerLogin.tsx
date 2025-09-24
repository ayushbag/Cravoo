import { toast } from "sonner"
import AuthCard from "../../components/authCard"
import { authContent } from "../../constants/authContent"
import AuthLayout from "../../layouts/authLayout"
import axiosInstance from "../../services/axios"
import { useNavigate } from "react-router-dom"

const FoodPartnerLogin = () => {

    const navigate = useNavigate();  

    const handleSubmit = async (data: Record<string, FormDataEntryValue>) => {
        try {
            const res = await axiosInstance.post("/auth/food-partner/login", data);
            toast.success(res.data.message || "Food partner login success");
            navigate("/create-food")
        } catch (err: any) {
            toast.error(err.response?.data.errors || err.response?.data.message || err.message)
        }
    }

    return (
        <AuthLayout>
            <AuthCard
                role="food-partner"
                type="login"
                cardTitle={authContent.foodPartner.login.title}
                cardDescription={authContent.foodPartner.login.desc}
                onSubmit={handleSubmit}
            />
        </AuthLayout>
    )
}

export default FoodPartnerLogin