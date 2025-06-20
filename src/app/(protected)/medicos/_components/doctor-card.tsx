import { CalendarDays, Clock, DollarSign, Stethoscope } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

import AddDoctorButton from "./add-doctor-button";

type DoctorCardProps = {
  id: string;
  avatarImageUrl: string | null;
  name: string;
  specialty: string;
  availableFromWeekDay: number;
  availableToWeekDay: number;
  availableFromTime: string;
  availableToTime: string;
  appointmentPriceInCents: number;
  createdAt: Date;
  updatedAt: Date | null;
  clinicId: string;
};

const DoctorCard = (item: DoctorCardProps) => {
  return (
    <Card
      key={item.id}
      className="flex justify-between lg:min-h-96 lg:max-w-64"
      aria-invalid
    >
      <CardContent className="flex h-96 flex-col justify-between gap-3">
        <div className="flex flex-col items-center justify-center gap-2">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={item.avatarImageUrl ?? undefined}
              alt={item.name ?? ""}
            />
            <AvatarFallback className="items-center justify-center">
              {item.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="text-sm font-bold">Dr(a). {item.name}</div>
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <div className="rounded-4xl bg-blue-100">
                <Stethoscope
                  size={24}
                  className="justify-center p-1 text-blue-500"
                />
              </div>
              {item.specialty}
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-3">
          <p className="flex items-center gap-2">
            <CalendarDays size={16} />
            {item.availableFromWeekDay} a {item.availableToWeekDay}
          </p>
          <p className="flex items-center gap-2">
            <Clock size={16} />
            Das {item.availableFromTime} as {item.availableToTime}
          </p>
          <p className="flex items-center gap-2">
            <DollarSign size={16} />
            R${item.appointmentPriceInCents}
          </p>
        </div>
        <AddDoctorButton message="Ver detalhes" />
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
