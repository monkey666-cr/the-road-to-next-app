import { notFound } from "next/navigation";
import { getTicket } from "../queries/get-ticket";
import TicketUpsertForm from "./ticket-upsert-form";
import { CardCompact } from "@/components/card-comopact";
import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";

const TicketUpdate = async (ticketId: number) => {
  const { user } = await getAuth();
  const ticket = await getTicket(ticketId);

  const isTicketFound = !!ticket;
  const isTicketOwner = isOwner(user, ticket);

  if (!isTicketFound || !isTicketOwner) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col animate-fade-in-from-top">
      <CardCompact
        title="Edit Ticket"
        description="Edit an existing ticket"
        className="flex flex-col self-center w-full max-w-[650px]"
        content={<TicketUpsertForm ticket={ticket} />}
      />
    </div>
  );
};

export default TicketUpdate;
