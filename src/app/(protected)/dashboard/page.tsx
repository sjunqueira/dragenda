import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { clinicsTable, usersToClinicsTable } from "@/db/schema/schema";
import { auth } from "@/lib/auth";

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
      redirect("/clinic-form");
    }
    return (
      <div>
        <h1>Dashboard</h1>
        <p>{clinic?.name}</p>
        <p>{session?.user.name}</p>
      </div>
    );
  } else {
    setTimeout(() => {
      redirect("/login");
    }, 3000);
    return (
      <div>
        <p>
          Parece que não tem nada por aqui, redirecionando para a tela de login
        </p>
        <h1>
          Se você não for redirecionado{" "}
          <Link href={"/login"} className="text-blue-400">
            clique aqui
          </Link>
        </h1>
      </div>
    );
  }
}
