import AuthCard from "../../components/authCard"
import { authContent } from "../../constants/authContent"
import AuthLayout from "../../layouts/authLayout"

const FoodPartnerLogin = () => {
    return (
        <AuthLayout>
            <AuthCard
                role="food-partner"
                type="login"
                cardTitle={authContent.foodPartner.login.title}
                cardDescription={authContent.foodPartner.login.desc}
            />
        </AuthLayout>
    )
}

export default FoodPartnerLogin