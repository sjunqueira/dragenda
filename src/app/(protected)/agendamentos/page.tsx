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

const ApointmentsPage = () => {
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
              <Link href={"/agendamentos"}>Agendamentos</Link>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderTitle>Agendamentos</PageHeaderTitle>
          <PageHeaderDescription>
            Gerencie todos os agendamentos da sua clinica
          </PageHeaderDescription>
        </PageHeaderContent>
        <PageHeaderActions>
          <Button variant={"ghost"}>
            <Plus />
            Adicionar nova consulta
          </Button>
        </PageHeaderActions>
      </PageHeader>
      <PageContent>Conteúdo</PageContent>
    </PageContainer>
  );
};

export default ApointmentsPage;
