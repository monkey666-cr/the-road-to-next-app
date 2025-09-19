import initializeData from "@/data";
import { Heading } from "@/components/heading";
import TicketItem from "@/features/tickets/components/ticket-item";

export default function Tickets() {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading title="Tickets Page" />

      <div className="flex flex-1 flex-col items-center animate-fade-in-from-top">
        {initializeData.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}
