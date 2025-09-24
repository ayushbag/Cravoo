import AppRoutes from "./routes/appRoutes"
import { Toaster } from "sonner"

function App() {
  return (
    <>
      <AppRoutes />
      <Toaster />
    </>
  )
}

export default App