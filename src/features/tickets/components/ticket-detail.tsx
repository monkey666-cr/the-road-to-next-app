import { Button } from "@/components/ui/button";
import { Placeholder } from "@/components/ui/placeholder";
import { ticketsPath } from "@/path";
import Link from "next/link";
import TicketItem from "./ticket-item";
import { getTicket } from "../queries/get-ticket";
import { notFound } from "next/navigation";

type TicketDetailProps = {
  ticketId: string;
};

export const TicketDetail = async ({ ticketId }: TicketDetailProps) => {
  const ticket = await getTicket(ticketId);

  if (!ticket) {
    notFound();
  }

  return (
    <div className="flex flex-col flex-1 items-center animate-fade-in-from-top">
      <TicketItem ticket={ticket} isDetial />
    </div>
  );
};
