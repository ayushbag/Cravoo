import AuthCard from "./components/auth-card"

function App() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <AuthCard 
        cardTitle="Welcome Back 👋"
        cardDescription="Access your account to browse reels and order food."
      />
    </div>
  )
}

export default App