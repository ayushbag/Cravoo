import AuthCard from "../../components/authCard"
import { authContent } from "../../constants/authContent"
import AuthLayout from "../../layouts/authLayout"

const UserLogin = () => {
    return (
        <AuthLayout>
            <AuthCard
                cardTitle={authContent.user.login.title}
                cardDescription={authContent.user.login.desc}
            />
        </AuthLayout>
    )
}

export default UserLogin