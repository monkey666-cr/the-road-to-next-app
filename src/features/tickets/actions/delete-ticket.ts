"use server";

import { setCookieByKey } from "@/actions/cookies";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteTicket = async (ticketId: number): Promise<void> => {
  await prisma.ticket.delete({
    where: { id: ticketId },
  });

  revalidatePath(ticketsPath);
  await setCookieByKey("toast", "Ticket deleted");
  redirect(ticketsPath);
};
