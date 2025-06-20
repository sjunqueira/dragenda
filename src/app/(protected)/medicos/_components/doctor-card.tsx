import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { CalendarDays, Clock, DollarSign, Stethoscope } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import AddDoctorButton from "./add-doctor-button";
import { formatCurrencyInCents } from "@/app/helpers/currency";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

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
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const weekDays = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  const fromWeekDayName = weekDays[item.availableFromWeekDay];
  const toWeekDayName = weekDays[item.availableToWeekDay];

  const fromTime = dayjs
    .utc(item.availableFromTime, "HH:mm:ss")
    .tz(userTimeZone)
    .format("HH:mm");

  const toTime = dayjs
    .utc(item.availableToTime, "HH:mm:ss")
    .tz(userTimeZone)
    .format("HH:mm");

  return (
    <Card key={item.id} aria-invalid>
      <CardHeader>
        <div className="flex flex-col items-center justify-center gap-4">
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
          <div className="flex flex-col items-center justify-start gap-2">
            <h3 className="text-sm font-medium">Dr(a). {item.name}</h3>
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
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <Badge variant={"secondary"} className="flex items-center gap-2">
            <CalendarDays size={16} />
            De {fromWeekDayName} a {toWeekDayName}
          </Badge>
          <Badge variant={"secondary"} className="flex items-center gap-2">
            <Clock size={16} />
            Das {fromTime} às {toTime}
          </Badge>
          <Badge variant={"secondary"} className="flex items-center gap-2">
            <DollarSign size={16} />
            {formatCurrencyInCents(item.appointmentPriceInCents)}
          </Badge>
        </div>
        <Separator />
        <CardFooter className="flex w-full gap-1">
          <AddDoctorButton variant="secondary" message="Ver detalhes" />
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
