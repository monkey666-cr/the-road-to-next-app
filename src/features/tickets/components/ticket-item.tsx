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

const TicketItem = (ticketProps: TicketProps) => {
  const ticket = ticketProps.ticket;

  return (
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
  );
};

export default TicketItem;
