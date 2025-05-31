import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgSchema,
  pgTable,
  text,
  time,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const qaSchema = pgSchema("qa");

// Users
export const usersColumns = () => ({
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const usersTable = pgTable("users", usersColumns());
export const QaUsersTable = qaSchema.table("qa_users", usersColumns());

export const sessionsTable = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
});

export const accountsTable = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verificationsTable = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

//Users Relations
export const usersTableRelations = relations(usersTable, ({ many }) => ({
  usersToClinics: many(usersToClinicsTable),
}));

// Users to Clinics
export const usersToClinicsColumns = () => ({
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id),
  clinicId: uuid("clinic_id")
    .notNull()
    .references(() => clinicsTable.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const usersToClinicsTable = pgTable(
  "users_to_clinics",
  usersToClinicsColumns(),
);
export const qaUsersToClinicsTable = qaSchema.table(
  "qa_users_to_clinics",
  usersToClinicsColumns(),
);

//Users to Clinics Relations
export const usersToClinicsTableRelations = relations(
  usersToClinicsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [usersToClinicsTable.userId],
      references: [usersTable.id],
    }),
    clinic: one(clinicsTable, {
      fields: [usersToClinicsTable.clinicId],
      references: [clinicsTable.id],
    }),
  }),
);

// Clinics Table
export const clinicsColuns = () => ({
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const clinicsTable = pgTable("clinics", clinicsColuns());

export const QaClinicsTable = qaSchema.table("qa_clinics", clinicsColuns());

export const clinicsTableRelations = relations(clinicsTable, ({ many }) => ({
  doctors: many(doctorsTable),
  patients: many(patientsTable),
  appointments: many(appointmentsTable),
  usersToClinics: many(usersToClinicsTable),
}));

//Doctors Tables
export const doctorsColumns = () => ({
  id: uuid("id").primaryKey().notNull(),
  name: text("name").notNull(),
  clinicId: uuid("patient_id")
    .notNull()
    .references(() => clinicsTable.id),
  avatarImageUrl: text("avatar_image_url"),
  specialty: text("specialty").notNull(),
  appointmentsPriceInCents: integer("appointments_price_in_cents").notNull(),
  // 0 - Domingo, 1 - Segunda, 2 - Terça, 3 - Quarta, 4 - Quinta, 5 - Sexta, 6 - Sábado
  avaiableFromWeekday: integer("avaiable_from_weekday").notNull(),
  avaiableToWeekday: integer("avaiable_to_weekday").notNull(),
  avaiableFromTime: time("avaiable_from_time").notNull(),
  avaiableToTime: time("avaiable_to_time").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .$onUpdate(() => new Date()),
});
export const doctorsTable = pgTable("doctors", doctorsColumns());

export const QaDoctorsTable = qaSchema.table("qa_doctors", doctorsColumns());

export const doctorsTableRelations = relations(doctorsTable, ({ one }) => ({
  clinic: one(clinicsTable, {
    fields: [doctorsTable.clinicId],
    references: [clinicsTable.id],
  }),
}));

//Patients Tables

export const patientsSexEnum = pgEnum("patient_sex", [
  "male",
  "female",
  "other",
]);

export const patientsColumns = () => ({
  id: uuid("id").primaryKey().notNull(),
  name: text("name").notNull(),
  clinicId: uuid("patient_id")
    .notNull()
    .references(() => clinicsTable.id),
  email: text("email").notNull().unique(),
  sex: patientsSexEnum("sex").notNull(),
  phoneNumber: text("phone_number").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const patientsTable = pgTable("patients", patientsColumns());

export const QaPatientsTable = qaSchema.table("qa_patients", patientsColumns());

export const patientsTableRelations = relations(patientsTable, ({ one }) => ({
  clinic: one(clinicsTable, {
    fields: [patientsTable.clinicId],
    references: [clinicsTable.id],
  }),
}));

// Appointments Tables
export const appointmentsColumns = () => ({
  id: uuid("id").primaryKey().notNull(),
  date: timestamp("date").notNull(),
  clinicId: uuid("patient_id")
    .notNull()
    .references(() => clinicsTable.id),
  patientId: uuid("patient_id")
    .notNull()
    .references(() => patientsTable.id),
  doctorId: uuid("doctor_id")
    .notNull()
    .references(() => doctorsTable.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const appointmentsTable = pgTable("appointments", appointmentsColumns());

export const QaAppointmentsTable = qaSchema.table(
  "qa_appointments",
  appointmentsColumns(),
);

export const appointmentsTableRelations = relations(
  appointmentsTable,
  ({ one }) => ({
    clinic: one(clinicsTable, {
      fields: [appointmentsTable.clinicId],
      references: [clinicsTable.id],
    }),
    patient: one(patientsTable, {
      fields: [appointmentsTable.patientId],
      references: [patientsTable.id],
    }),
    doctor: one(doctorsTable, {
      fields: [appointmentsTable.doctorId],
      references: [doctorsTable.id],
    }),
  }),
);
