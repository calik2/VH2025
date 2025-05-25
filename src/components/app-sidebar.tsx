import { Home, Inbox, User, LogOut } from "lucide-react"
import Image from "next/image"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/home/recommended",
    icon: Home,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
  {
    title: "Logout",
    url: "/logout",
    icon: LogOut,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
<SidebarContent className="bg-[#4F364B] text-white h-full">
        <SidebarGroup>
        <SidebarGroupLabel asChild>
  <div className="flex flex-col items-center pl-2 mt-2 mb-10 gap-2 w-full px-4">
    <Image src="/logo/mentHERWhite.png" alt="MentHer Logo" width={200} height={24} />
    <hr className="border-t border-white w-full opacity-100" />
  </div>
</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                <a href={item.url}
                  className="flex items-center gap-3 text-lg pl-6 w-full py-3 rounded-md transition-colors duration-200 hover:bg-[#5a465a] hover:text-white"
                >
                  <item.icon size={24} />
                  <span className="text-lg font-medium">{item.title}</span>
                </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
