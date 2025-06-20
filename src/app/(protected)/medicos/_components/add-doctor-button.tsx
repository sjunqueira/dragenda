"use client";
import { Pencil, Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import UpsertDoctorForm from "./upsert-doctor-form";

type AddDoctorButtonProps = {
  message: string;
  variant: "ghost" | "default" | "secondary";
};

const AddDoctorButton = ({ message, variant }: AddDoctorButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} className="w-full">
          {message === "Adicionar novo médico" && <Plus />}
          {message === "Editar" && <Pencil />}
          {message}
        </Button>
      </DialogTrigger>
      <UpsertDoctorForm onSuccess={() => setIsOpen(false)} />
    </Dialog>
  );
};

export default AddDoctorButton;
