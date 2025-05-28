CREATE SCHEMA "qa";
--> statement-breakpoint
CREATE TYPE "public"."patient_sex" AS ENUM('male', 'female', 'other');--> statement-breakpoint
CREATE TABLE "qa"."qa_appointments" (
	"id" uuid PRIMARY KEY NOT NULL,
	"date" timestamp NOT NULL,
	"patient_id" uuid NOT NULL,
	"doctor_id" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "qa"."qa_clinics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "qa"."qa_doctors" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"patient_id" uuid NOT NULL,
	"avatar_image_url" text,
	"specialty" text NOT NULL,
	"appointments_price_in_cents" integer NOT NULL,
	"avaiable_from_weekday" integer NOT NULL,
	"avaiable_to_weekday" integer NOT NULL,
	"avaiable_from_time" time NOT NULL,
	"avaiable_to_time" time NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "qa"."qa_patients" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"patient_id" uuid NOT NULL,
	"email" text NOT NULL,
	"sex" "patient_sex" NOT NULL,
	"phone_number" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "qa_patients_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "qa"."qa_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "appointments" (
	"id" uuid PRIMARY KEY NOT NULL,
	"date" timestamp NOT NULL,
	"patient_id" uuid NOT NULL,
	"doctor_id" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "clinics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "doctors" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"patient_id" uuid NOT NULL,
	"avatar_image_url" text,
	"specialty" text NOT NULL,
	"appointments_price_in_cents" integer NOT NULL,
	"avaiable_from_weekday" integer NOT NULL,
	"avaiable_to_weekday" integer NOT NULL,
	"avaiable_from_time" time NOT NULL,
	"avaiable_to_time" time NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "patients" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"patient_id" uuid NOT NULL,
	"email" text NOT NULL,
	"sex" "patient_sex" NOT NULL,
	"phone_number" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "patients_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "qa"."qa_users_to_clinics" (
	"user_id" uuid NOT NULL,
	"clinic_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users_to_clinics" (
	"user_id" uuid NOT NULL,
	"clinic_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "qa"."qa_appointments" ADD CONSTRAINT "qa_appointments_patient_id_clinics_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."clinics"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "qa"."qa_appointments" ADD CONSTRAINT "qa_appointments_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "qa"."qa_appointments" ADD CONSTRAINT "qa_appointments_doctor_id_doctors_id_fk" FOREIGN KEY ("doctor_id") REFERENCES "public"."doctors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "qa"."qa_doctors" ADD CONSTRAINT "qa_doctors_patient_id_clinics_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."clinics"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "qa"."qa_patients" ADD CONSTRAINT "qa_patients_patient_id_clinics_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."clinics"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_patient_id_clinics_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."clinics"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_doctor_id_doctors_id_fk" FOREIGN KEY ("doctor_id") REFERENCES "public"."doctors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_patient_id_clinics_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."clinics"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patients" ADD CONSTRAINT "patients_patient_id_clinics_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."clinics"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "qa"."qa_users_to_clinics" ADD CONSTRAINT "qa_users_to_clinics_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "qa"."qa_users_to_clinics" ADD CONSTRAINT "qa_users_to_clinics_clinic_id_clinics_id_fk" FOREIGN KEY ("clinic_id") REFERENCES "public"."clinics"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_clinics" ADD CONSTRAINT "users_to_clinics_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_clinics" ADD CONSTRAINT "users_to_clinics_clinic_id_clinics_id_fk" FOREIGN KEY ("clinic_id") REFERENCES "public"."clinics"("id") ON DELETE no action ON UPDATE no action;