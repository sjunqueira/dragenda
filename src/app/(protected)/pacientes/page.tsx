import { Plus } from "lucide-react";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

import {
  PageContainer,
  PageContent,
  PageHeader,
  PageHeaderActions,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderTitle,
} from "../components/pagecontainer";

const PatientsPage = () => {
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
              <Link href={"/pacientes"}>Pacientes</Link>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderTitle>Pacientes</PageHeaderTitle>
          <PageHeaderDescription>
            Gerencie todos os pacientes de sua clinica
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
};

export default PatientsPage;
