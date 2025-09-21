import TicketItem from "./ticket-item";
import { getTicket } from "../queries/get-ticket";
import { notFound } from "next/navigation";

type TicketDetailProps = {
  ticketId: number;
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
