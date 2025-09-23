import AuthCard from "../../components/authCard"
import { authContent } from "../../constants/authContent"
import AuthLayout from "../../layouts/authLayout"

const UserRegister = () => {
    return (
        <AuthLayout>
            <AuthCard
                cardTitle={authContent.user.register.title}
                cardDescription={authContent.user.register.desc}
            />
        </AuthLayout>
    )
}

export default UserRegister