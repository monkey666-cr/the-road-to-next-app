"use server";

import { setCookieByKey } from "@/actions/cookies";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteTicket = async (
  ticketId: number,
  pathname: string
): Promise<ActionState> => {
  try {
    await prisma.ticket.delete({
      where: { id: ticketId },
    });
  } catch (error) {
    const res = fromErrorToActionState(error);
    if (pathname != ticketsPath) {
      await setCookieByKey("toast", res.message);
      redirect(ticketsPath);
    }
    return res;
  }

  revalidatePath(ticketsPath);

  let toastMessage = "";
  if (pathname !== ticketsPath) {
    await setCookieByKey("toast", "Ticket deleted");
    redirect(ticketsPath);
  } else {
    toastMessage = "Ticket deleted";
  }

  return toActionState("SUCCESS", toastMessage);
};
