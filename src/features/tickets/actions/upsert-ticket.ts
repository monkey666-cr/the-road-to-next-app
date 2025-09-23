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

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(1024),
});

export const upsertTicket = async (
  id: number | undefined,
  _actionState: ActionState,
  formData: FormData
) => {
  try {
    const data = upsertTicketSchema.parse({
      title: formData.get("title"),
      description: formData.get("description") as string,
    });
    await prisma.ticket.upsert({
      where: { id: id || -1 },
      create: data,
      update: data,
    });
  } catch (error) {
    // return { message: "Something went wrong", payload: formData };
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(ticketsPath);

  if (id) {
    setCookieByKey("toast", "Ticket updated");
    redirect(ticketsPath);
  }

  return toActionState("SUCCESS", "Ticket created");
};
