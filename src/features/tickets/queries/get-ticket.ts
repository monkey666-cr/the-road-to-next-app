import { prisma } from "@/lib/prisma";

export const getTicket = async (ticketId: number) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
    include: { User: { select: { username: true } } },
  });

  if (!ticket) {
    return null;
  }

  return ticket;
};
