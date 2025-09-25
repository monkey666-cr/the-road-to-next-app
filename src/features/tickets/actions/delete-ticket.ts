"use server";

import { setCookieByKey } from "@/actions/cookies";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteTicket = async (
  ticketId: number,
  pathname: string
): Promise<{ status: string; message: string }> => {
  await prisma.ticket.delete({
    where: { id: ticketId },
  });

  revalidatePath(ticketsPath);

  let toastMessage = "";
  if (pathname !== ticketsPath) {
    await setCookieByKey("toast", "Ticket deleted");
    redirect(ticketsPath);
  } else {
    toastMessage = "Ticket deleted";
  }

  return { status: "SUCCESS", message: toastMessage };
};
