import { eq, inArray } from "drizzle-orm";
import {
  Banknote,
  Calendar,
  ChartArea,
  Settings,
  Stethoscope,
  UserCircle,
  UserRoundSearch,
} from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";

import NewClinicForm from "@/app/(protected)/clinic-form/_components/form";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { db } from "@/db";
import { clinicsTable, usersToClinicsTable } from "@/db/schema/schema";
import { auth } from "@/lib/auth";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import SignOutButton from "./ui/signout-button";

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

const SettingsItems = [
  {
    title: "Perfil",
    url: "/perfil",
    icon: UserCircle,
  },
  {
    title: "Financeiro",
    url: "/financeiro",
    icon: Banknote,
  },
  {
    title: "Configurações",
    url: "/configuracoes",
    icon: Settings,
  },
];

export async function AppSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (session) {
    const clinics = db.query.usersToClinicsTable.findMany({
      where: eq(usersToClinicsTable.userId, session?.user.id),
    });

    const clinicsIds = (await clinics).map((c) => c.clinicId);

    const clinicsNames = await db.query.clinicsTable.findMany({
      where: inArray(clinicsTable.id, clinicsIds),
      columns: {
        name: true,
      },
    });

    return (
      <Sidebar>
        <SidebarHeader className="items-center pt-5 pb-3">
          <Image src={"/Logo.svg"} alt="Dr. Agenda" width={137} height={28} />
        </SidebarHeader>
        <SidebarContent className="justify-between">
          <SidebarGroup>
            <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {MainItems.map((item) => (
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
          <SidebarGroup>
            <SidebarGroupLabel>Configurações</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="flex">
                <SidebarMenuItem>
                  <DropdownMenu>
                    {/* <div className="flex flex-col"> */}
                    <DropdownMenuTrigger className="flex items-center justify-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={session.user.image ?? undefined}
                          alt={session.user.name ?? ""}
                        />
                        <AvatarFallback>
                          {session.user.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start text-sm">
                        <p className="text-sm">{clinicsNames[0]?.name}</p>
                        <p className="text-muted-foreground text-sm">
                          {session.user.email}
                        </p>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="start">
                      <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                      <DropdownMenuGroup>
                        {SettingsItems.map((item) => (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                              <a href={item.url}>
                                <item.icon />
                                <span>{item.title}</span>
                              </a>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Minhas Clinicas</DropdownMenuLabel>
                      <DropdownMenuGroup>
                        {(await clinicsNames).map((item) => (
                          <DropdownMenuItem
                            key={item.name}
                            className="flex p-2"
                            aria-invalid
                          >
                            {item.name}
                            <DropdownMenuShortcut>⌘+t</DropdownMenuShortcut>
                          </DropdownMenuItem>
                        ))}

                        <NewClinicForm />
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <SignOutButton />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                    {/* </div> */}
                  </DropdownMenu>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );
  }
}
