import { prisma } from "@/lib/prisma";
import { Ticket } from "@prisma/client";

export const getTicket = async (ticketId: number): Promise<Ticket | null> => {
  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
  });

  if (!ticket) {
    return null;
  }

  return ticket;
};
