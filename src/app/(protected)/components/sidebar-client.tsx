"use client";
import {
  Calendar,
  ChartArea,
  Stethoscope,
  UserRoundSearch,
} from "lucide-react";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

// Menu items.
const MainItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: ChartArea,
  },
  {
    title: "Agendamentos",
    url: "/agendamentos",
    icon: Calendar,
  },
  {
    title: "Médicos",
    url: "/medicos",
    icon: Stethoscope,
  },
  {
    title: "Pacientes",
    url: "/pacientes",
    icon: UserRoundSearch,
  },
];

export function ClientSidebar() {
  const session = authClient.useSession();

  const pathname = usePathname();

  if (session) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {MainItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={pathname == item.url}>
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
    );
  }
}
