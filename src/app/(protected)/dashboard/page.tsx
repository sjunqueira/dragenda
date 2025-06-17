import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { clinicsTable, usersToClinicsTable } from "@/db/schema/schema";
import { auth } from "@/lib/auth";
import ClinicForm from "../components/clinic-form";
import NewClinicForm from "../components/form";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  PageContainer,
  PageHeader,
  PageHeaderContent,
  PageHeaderTitle,
  PageHeaderDescription,
  PageHeaderActions,
  PageContent,
} from "../components/pagecontainer";
import Link from "next/link";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (session) {
    const clinics = db.query.usersToClinicsTable.findMany({
      where: eq(usersToClinicsTable.userId, session?.user.id),
    });

    const clinicsList = await clinics;

    const clinic = await db.query.clinicsTable.findFirst({
      where: eq(clinicsTable.id, clinicsList[0]?.clinicId),
    });
    if ((await clinics).length == 0) {
      return (
        <div className="mx-auto flex h-full w-fit flex-col content-center items-center justify-center">
          Está meio vazio por aqui...
          <NewClinicForm />
        </div>
      );
    }
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
          </BreadcrumbList>
        </Breadcrumb>
        <PageHeader>
          <PageHeaderContent>
            <PageHeaderTitle>Dashboard</PageHeaderTitle>
            <PageHeaderDescription>
              Verifique os resultados do(a) {clinic?.name}
            </PageHeaderDescription>
          </PageHeaderContent>
          <PageHeaderActions>
            <Button variant={"ghost"}>
              <Plus />
              Adicionar Paciente
            </Button>
          </PageHeaderActions>
        </PageHeader>
        <PageContent>Conteúdo</PageContent>
      </PageContainer>
    );
  } else {
    redirect("/login");
  }
}
