"use server";
import { headers } from "next/headers";

import { db } from "@/db";
import { doctorsTable } from "@/db/schema/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-acion";

import { upsertDoctorSchema } from "./schema";

export const upsertDoctor = actionClient
  .schema(upsertDoctorSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    if (!session?.user.clinic?.id) {
      throw new Error("Clinic not found");
    }
    await db
      .insert(doctorsTable)
      .values({
        id: parsedInput.id,
        ...parsedInput,
        clinicId: session?.user.clinic?.id,
      })
      .onConflictDoUpdate({
        target: [doctorsTable.id],
        set: {
          ...parsedInput,
          clinicId: session?.user.clinic?.id,
        },
      });
  });
