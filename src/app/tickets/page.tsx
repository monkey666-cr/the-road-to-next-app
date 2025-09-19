import initializeData from "@/data";
import { ticketPath } from "@/path";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import clsx from "clsx";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { LucideFileText, LucidePencil, LucideCircleCheck } from "lucide-react";
import { Heading } from "@/components/heading";

const TicketStatus = {
  OPEN: <LucideFileText />,
  IN_PROGRESS: <LucidePencil />,
  CLOSED: <LucideCircleCheck />,
};

export default function Tickets() {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading title="Tickets Page" />

      <div className="flex flex-1 flex-col items-center animate-fade-in-from-top">
        {initializeData.map((ticket) => (
          <Card key={ticket.id} className="w-full max-w-[420px] mb-4">
            <CardHeader>
              <CardTitle className="flex flex-row justify-between items-center">
                <span className="line-clamp-1 w-full max-w-[250]">
                  {ticket.title}
                </span>
                <span>{TicketStatus[ticket.status]}</span>
              </CardTitle>
            </CardHeader>
            <CardContent
              className={clsx("text-sm line-clamp-1 w-full max-w-[350]", {
                "line-through text-gray-400": ticket.status === "CLOSED",
              })}
            >
              {ticket.description}
            </CardContent>
            <CardFooter className="justify-end">
              <Link href={ticketPath(ticket.id)} className="underline text-sm">
                View
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
