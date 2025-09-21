"use server";

import { prisma } from "@/lib/prisma";

export const deleteTicket = async (ticketId: number): Promise<void> => {
  await prisma.ticket.delete({
    where: { id: ticketId },
  });
};
