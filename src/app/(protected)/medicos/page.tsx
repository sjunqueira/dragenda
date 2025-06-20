import { eq, inArray } from "drizzle-orm";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import DoctorCard from "./_components/doctor-card";

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
            <BreadcrumbPage>
              <Link href={"/medicos"}>Médicos</Link>
            </BreadcrumbPage>
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
          <DoctorCard key={item.id} {...item} />
        ))}
      </PageContent>
    </PageContainer>
  );
};

export default DoctorsPage;
