import { eq } from "drizzle-orm";
import { Plus } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { clinicsTable, usersToClinicsTable } from "@/db/schema/schema";
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
        <PageContainer>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/dashboard" className="to-blue-500">
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </BreadcrumbList>
          </Breadcrumb>
          <PageContent>
            <div className="mx-auto my-auto flex flex-col items-center justify-center gap-6 space-y-6">
              Parece que você ainda não cadastrou nenhuma clinica
              <NewClinicForm />
            </div>
          </PageContent>
        </PageContainer>
      );
    }
    return (
      <PageContainer>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <BreadcrumbPage>
                  <Link href={"/"}>Home</Link>
                </BreadcrumbPage>
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
