import { prisma } from "@/lib/prisma";
import { Ticket } from "@prisma/client";

export const getTickets = async (): Promise<Ticket[]> => {
  const tickets = await prisma.ticket.findMany();

  return tickets;
};
