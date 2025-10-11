"use server";

import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { ticketPath } from "@/path";
import { TicketStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

const updateTicketStatus = async (ticketId: number, ticketStatus: string) => {
  // Simulate network latency
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const { user } = await getAuthOrRedirect();

  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket || !isOwner(user, ticket)) {
      return toActionState("ERROR", "Not authorized");
    }

    await prisma.ticket.update({
      where: { id: ticketId },
      data: { status: ticketStatus as TicketStatus },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketPath(ticketId));

  return toActionState("SUCCESS", "Status updated");
};

export { updateTicketStatus };
