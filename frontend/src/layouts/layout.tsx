import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import { AppSidebar } from "../components/appSidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex sm:hidden">
                
            </div>
            <div className="hidden md:flex m-1">
                <AppSidebar />
                <SidebarTrigger />
            </div>
            <main className="mx-auto">
                {children}
            </main>
        </SidebarProvider>
    )
}