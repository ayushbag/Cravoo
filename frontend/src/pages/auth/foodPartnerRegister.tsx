import { toast } from "sonner"
import AuthCard from "../../components/authCard"
import { authContent } from "../../constants/authContent"
import AuthLayout from "../../layouts/authLayout"
import axiosInstance from "../../services/axios"
import { useNavigate } from "react-router-dom"

const FoodPartnerRegister = () => {

    const navigate = useNavigate();

    const handleSubmit = async (data: Record<string, FormDataEntryValue>) => {
        try {
            const res = await axiosInstance.post("/auth/food-partner/register", data);
            toast.success(res.data.message || "Food partner registered success");
            navigate("/create-food")
        } catch (err: any) {
            toast.error(err.response?.data.errors || err.response?.data.message || err.message)
        }
    }

    return (
        <AuthLayout>
            <AuthCard
                role="food-partner"
                type="register"
                cardTitle={authContent.foodPartner.register.title}
                cardDescription={authContent.foodPartner.register.desc}
                onSubmit={handleSubmit}
            />
        </AuthLayout>
    )
}

export default FoodPartnerRegister