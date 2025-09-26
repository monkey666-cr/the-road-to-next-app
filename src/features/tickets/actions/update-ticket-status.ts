"use server";

import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketPath } from "@/path";
import { TicketStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

const updateTicketStatus = async (ticketId: number, ticketStatus: string) => {
  try {
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
