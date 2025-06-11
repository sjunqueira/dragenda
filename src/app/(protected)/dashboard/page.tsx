import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { clinicsTable, usersToClinicsTable } from "@/db/schema/schema";
import { auth } from "@/lib/auth";
import ClinicForm from "../clinic-form/clinic-form";
import NewClinicForm from "../clinic-form/_components/form";

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
      <div>
        <h1>Dashboard</h1>
        <p>{clinic?.name}</p>
        <p>{session?.user.name}</p>
      </div>
    );
  } else {
    redirect("/login");
  }
}
