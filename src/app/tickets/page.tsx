"use client";

import { Heading } from "@/components/heading";
import TicketItem from "@/features/tickets/components/ticket-item";
import { useEffect, useState } from "react";
import { Ticket } from "@/features/tickets/types";
import { getTickets } from "@/features/tickets/queries/get-tickets";

export default function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const tickets = await getTickets();

      setTickets(tickets);
    };

    fetchTickets();
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      <Heading title="Tickets Page" />

      <div className="flex flex-1 flex-col items-center animate-fade-in-from-top">
        {tickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}
