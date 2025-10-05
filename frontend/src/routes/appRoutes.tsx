import { BrowserRouter, Routes, Route } from "react-router-dom"
import UserRegister from "../pages/auth/userRegister"
import UserLogin from "../pages/auth/userLogin"
import FoodPartnerRegister from "../pages/auth/foodPartnerRegister"
import FoodPartnerLogin from "../pages/auth/foodPartnerLogin"
import Home from "../pages/general/home"
import CreateFood from "../pages/foodPartner/createFood"
import Profile from "../pages/foodPartner/profile"
import Saved from "../pages/general/saved"
import ProtectedRoute from "../pages/general/protectedRoute"
import FoodPartnerDashboard from "../pages/foodPartner/dashboard"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes */}
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />

        {/* Protected routes for both user + foodpartner */}
        <Route element={<ProtectedRoute allowedRoles={["foodpartner", "user"]} />}>
          <Route path="/" element={<Home />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/food-partner/:id" element={<Profile />} />
        </Route>

        {/* Protected routes for foodpartner only */}
        <Route element={<ProtectedRoute allowedRoles={["foodpartner"]} />}>
          <Route path="/create-food" element={<CreateFood />} />
          <Route path="/dashboard" element={<FoodPartnerDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes