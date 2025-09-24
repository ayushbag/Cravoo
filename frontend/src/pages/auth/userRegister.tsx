import { toast } from "sonner"
import AuthCard from "../../components/authCard"
import { authContent } from "../../constants/authContent"
import AuthLayout from "../../layouts/authLayout"
import axiosInstance from "../../services/axios"

const UserRegister = () => {

    const handleSubmit = async (data: Record<string, FormDataEntryValue>) => {
        try {
            await axiosInstance.post("/user/register", data);
            console.log("register success!");
            // Todo: redirect to dashboard, toast
            toast.error("register success!")
        } catch (err : any) {
            console.error("register error: ", err.response?.data || err.message);
            console.log(err)
            // Todo: toast error
            toast.error(err.response?.error || err.message);
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