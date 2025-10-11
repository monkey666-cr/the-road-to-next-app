"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { setCookieByKey } from "@/actions/cookies";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(1024),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Is Required"),
  bounty: z.coerce.number().positive(),
});

export const upsertTicket = async (
  id: number | undefined,
  _actionState: ActionState,
  formData: FormData
) => {
  const { user } = await getAuthOrRedirect();

  try {
    if (id) {
      const ticket = await prisma.ticket.findUnique({
        where: { id },
      });
      if (!ticket || !isOwner(user, ticket)) {
        return toActionState("ERROR", "Not authorized");
      }
    }
    const data = upsertTicketSchema.parse({
      title: formData.get("title"),
      description: formData.get("description") as string,
      deadline: formData.get("deadline") as string,
      bounty: formData.get("bounty") as string,
    });
    const dbData = {
      ...data,
      userId: user.id,
      bounty: data.bounty * 100,
    };
    await prisma.ticket.upsert({
      where: { id: id || -1 },
      create: dbData,
      update: dbData,
    });
  } catch (error) {
    // return { message: "Something went wrong", payload: formData };
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(ticketsPath);

  if (id) {
    await setCookieByKey("toast", "Ticket updated");
    redirect(ticketsPath);
  }

  return toActionState("SUCCESS", "Ticket created");
};
