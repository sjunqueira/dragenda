import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import NewClinicForm from "./form";

export default function ClinicForm() {
  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Clinica</DialogTitle>
          <DialogDescription>
            Adicione a sua primeira clínica para continuar
          </DialogDescription>
        </DialogHeader>
        <NewClinicForm />
      </DialogContent>
    </Dialog>
  );
}
