import { eq, inArray } from "drizzle-orm";
import {
  Calendar,
  ChartArea,
  PlusIcon,
  Stethoscope,
  User2Icon,
  UserRoundSearch,
} from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

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

import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
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
import { Input } from "./ui/input";
import { Label } from "./ui/label";
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

export async function AppSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (session) {
    const clinics = db.query.usersToClinicsTable.findMany({
      where: eq(usersToClinicsTable.userId, session?.user.id),
    });

    const clinicsIds = (await clinics).map((c) => c.clinicId);

    const clinicsNames = db.query.clinicsTable.findMany({
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
                    <DropdownMenuTrigger className="flex items-center justify-center gap-2">
                      <User2Icon />
                      Minha Conta
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="start">
                      <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          Perfil
                          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Financeiro
                          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Configurações
                          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
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
