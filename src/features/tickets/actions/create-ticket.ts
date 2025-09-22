"use server";

import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const upsertTicket = async ({
  id,
  title,
  description,
}: {
  id?: number;
  title: string;
  description: string;
}) => {
  if (id) {
    await prisma.ticket.update({
      where: { id: id },
      data: {
        title: title,
        description: description,
      },
    });

    revalidatePath(ticketsPath);

    redirect(ticketsPath);
  } else {
    await prisma.ticket.create({
      data: {
        title: title,
        description: description,
      },
    });
    revalidatePath(ticketsPath);
  }
};
