import { Item } from "@radix-ui/react-dropdown-menu";
import { eq, inArray } from "drizzle-orm";
import {
  Baby,
  Calendar,
  CalendarDays,
  Clock,
  DollarSign,
  Heart,
  HeartPulse,
} from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/db";
import { doctorsTable, usersToClinicsTable } from "@/db/schema/schema";
import { auth } from "@/lib/auth";

import NewClinicForm from "../components/form";
import {
  PageContainer,
  PageContent,
  PageHeader,
  PageHeaderActions,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderTitle,
} from "../components/pagecontainer";
import AddDoctorButton from "./_components/add-doctor-button";

const DoctorsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  if (!session.user.clinic) {
    <NewClinicForm />;
  }

  const clinics = db.query.usersToClinicsTable.findMany({
    where: eq(usersToClinicsTable.userId, session?.user.id),
  });

  const clinicsIds = (await clinics).map((c) => c.clinicId);

  const doctors = await db.query.doctorsTable.findMany({
    where: inArray(doctorsTable.clinicId, clinicsIds),
    // columns: {
    //   name: true,
    //   specialty:
    // },
  });

  return (
    <PageContainer>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Médicos</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderTitle>Médicos</PageHeaderTitle>
          <PageHeaderDescription>
            Gerencie os médicos de sua clinica
          </PageHeaderDescription>
        </PageHeaderContent>
        <PageHeaderActions>
          <AddDoctorButton message="Adicionar novo médico" />
        </PageHeaderActions>
      </PageHeader>
      <PageContent>
        {doctors.map((item) => (
          <Card key={item.id} className="flex w-72 border-0" aria-invalid>
            <CardContent className="flex flex-col justify-center gap-3">
              <div className="flex items-center gap-2">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={item.avatarImageUrl ?? undefined}
                    alt={item.name ?? ""}
                  />
                  <AvatarFallback>
                    {item.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <p className="text-sm">Dr(a). {item.name}</p>
                  <p className="text-muted-foreground flex items-center gap-1 text-sm">
                    <HeartPulse
                      size={24}
                      className="justify-center rounded-4xl bg-blue-100 p-1 text-blue-500"
                    />
                    {item.specialty}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <p className="flex items-center gap-2">
                  <CalendarDays size={16} />
                  {item.availableFromWeekDay} a {item.availableToWeekDay}
                </p>
                <p className="flex items-center gap-2">
                  <Clock size={16} />
                  Das {item.availableFromTime} as {item.availableToTime}
                </p>
                <p className="flex items-center gap-2">
                  <DollarSign size={16} />
                  R${item.appointmentPriceInCents}
                </p>
              </div>
              <AddDoctorButton message="Ver detalhes" />
            </CardContent>
          </Card>
        ))}
      </PageContent>
    </PageContainer>
  );
};

export default DoctorsPage;
