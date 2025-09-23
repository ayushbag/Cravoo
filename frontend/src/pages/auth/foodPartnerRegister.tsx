import AuthCard from "../../components/authCard"
import { authContent } from "../../constants/authContent"
import AuthLayout from "../../layouts/authLayout"

const FoodPartnerRegister = () => {
    return (
        <AuthLayout>
            <AuthCard
                cardTitle={authContent.foodPartner.register.title}
                cardDescription={authContent.foodPartner.register.desc}
            />
        </AuthLayout>
    )
}

export default FoodPartnerRegister