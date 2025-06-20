"use server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { doctorsTable } from "@/db/schema/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-acion";

import { upsertDoctorSchema } from "./schema";

dayjs.extend(utc);

export const upsertDoctor = actionClient
  .schema(upsertDoctorSchema)
  .action(async ({ parsedInput }) => {
    const availableFromTime = parsedInput.availableFromTime;
    const availableToTime = parsedInput.availableToTime;

    const availableFromTimeUtc = dayjs()
      .set("hour", parseInt(availableFromTime.split(":")[0]))
      .set("minute", parseInt(availableFromTime.split(":")[1]))
      .set("second", parseInt(availableFromTime.split(":")[2]))
      .utc();

    const availableToTimeUtc = dayjs()
      .set("hour", parseInt(availableToTime.split(":")[0]))
      .set("minute", parseInt(availableToTime.split(":")[1]))
      .set("second", parseInt(availableToTime.split(":")[2]))
      .utc();

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
        availableFromTime: availableFromTimeUtc.format("HH:mm:ss"),
        availableToTime: availableToTimeUtc.format("HH:mm:ss"),
      })
      .onConflictDoUpdate({
        target: [doctorsTable.id],
        set: {
          ...parsedInput,
          clinicId: session?.user.clinic?.id,
          availableFromTime: availableFromTimeUtc.format("HH:mm:ss"),
          availableToTime: availableToTimeUtc.format("HH:mm:ss"),
        },
      });
    revalidatePath("/medicos");
  });
