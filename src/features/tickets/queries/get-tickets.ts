import { prisma } from "@/lib/prisma";

export const getTickets = async () => {
  const tickets = await prisma.ticket.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: { User: { select: { username: true } } },
  });

  return tickets;
};
