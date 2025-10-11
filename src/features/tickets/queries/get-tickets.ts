import { prisma } from "@/lib/prisma";

export const getTickets = async (userId: string | null | undefined) => {
  const tickets = await prisma.ticket.findMany({
    where: userId ? { userId } : {},
    orderBy: {
      createdAt: "desc",
    },
    include: { User: { select: { username: true } } },
  });

  return tickets;
};
