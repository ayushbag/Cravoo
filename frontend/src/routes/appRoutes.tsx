import { BrowserRouter, Routes, Route } from "react-router-dom"
import UserRegister from "../pages/auth/userRegister"
import UserLogin from "../pages/auth/userLogin"
import FoodPartnerRegister from "../pages/auth/foodPartnerRegister"
import FoodPartnerLogin from "../pages/auth/foodPartnerLogin"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes