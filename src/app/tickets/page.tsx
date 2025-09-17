import initializeData from "@/data";
import { ticketPath } from "@/path";
import Link from "next/link";

const TicketStatus = {
  OPEN: "O",
  IN_PROGRESS: "P",
  CLOSED: "C",
};

export default function Tickets() {
  return (
    <>
      <h1>Tickets Page</h1>

      {initializeData.map((ticket) => (
        <div key={ticket.id} className="border p-4 my-2">
          <h2 className="text-xl font-bold">{ticket.title}</h2>
          <p>{ticket.description}</p>
          <span>{TicketStatus[ticket.status]}</span>
          <Link href={ticketPath(ticket.id)}>Go to Ticket: {ticket.id}</Link>
        </div>
      ))}
    </>
  );
}
