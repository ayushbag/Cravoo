import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarGroupContent,
    SidebarMenuItem,
    SidebarMenuButton
} from "../components/ui/sidebar"
import { Bookmark, Home, Inbox, Search, Settings, Store } from "lucide-react"
import CravoIcon from "./icons/cravoIcon"
import { useSidebar } from "../components/ui/sidebar"

const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Explore",
        url: "#",
        icon: Inbox,
    },
    {
        title: "Stores",
        url: "#",
        icon: Store,
    },
    {
        title: "Orders",
        url: "#",
        icon: Search,
    },
    {
        title: "Saved",
        url: "#",
        icon: Bookmark,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings
    }
]

export function AppSidebar() {
    const { state } = useSidebar();

    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader />
            <SidebarContent>
                <SidebarHeader className="flex flex-row items-center gap-3 p-2">
                    <CravoIcon isCollapsed={state === "collapsed"} />
                    {state !== "collapsed" && <h1>Cravoo</h1>}
                </SidebarHeader>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}