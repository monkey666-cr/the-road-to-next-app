import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TicketStatus } from "@/features/tickets/constants";
import { ticketPath } from "@/path";
import clsx from "clsx";
import Link from "next/link";
import { TicketProps } from "../types";
import { LucideSquareArrowOutUpRight, LucideTrash2 } from "lucide-react";

const TicketItem = (ticketProps: TicketProps) => {
  const ticket = ticketProps.ticket;

  return (
    <div className="flex flex-row w-full max-w-[420px] mb-4">
      {/* Ticket Card Info */}
      <Card key={ticket.id} className="w-full mr-2">
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
      </Card>

      {/* right side bar button */}
      <div className="flex flex-col justify-between items-center max-h-[50px] mt-2">
        <Link href={ticketPath(ticket.id)} className="underline text-sm">
          <LucideSquareArrowOutUpRight className="size-3.5"/>
        </Link>
        <Link href={ticketPath(ticket.id)} className="underline text-sm">
          <LucideTrash2 className="size-3.5"/>
        </Link>
      </div>
    </div>
  );
};

export default TicketItem;
