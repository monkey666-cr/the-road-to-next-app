import { getTickets } from "../queries/get-tickets";
import TicketItem from "./ticket-item";

export const TicketList = async () => {
  const tickets = await getTickets();

  // test error boundary
  // throw new Error("Failed to fetch tickets");

  return (
    <div className="flex flex-1 flex-col items-center">
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};
