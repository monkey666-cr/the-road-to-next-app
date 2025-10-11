"use server";

import { setCookieByKey } from "@/actions/cookies";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteTicket = async (
  ticketId: number,
  pathname: string
): Promise<ActionState> => {
  const { user } = await getAuthOrRedirect();

  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket || !isOwner(user, ticket)) {
      return toActionState("ERROR", "Not authorized");
    }

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
