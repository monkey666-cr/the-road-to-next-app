"use server";

import { prisma } from "@/lib/prisma";
import { sleep } from "@/lib/utils";
import { ticketsPath } from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const upsertTicket = async (
  id: number | undefined,
  _actionState: { message: string },
  formData: FormData
) => {
  // mock network sleep
  await sleep(2000);

  const data = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
  };
  await prisma.ticket.upsert({
    where: { id: id || -1 },
    create: data,
    update: data,
  });

  revalidatePath(ticketsPath);

  if (id) {
    redirect(ticketsPath);
  }

  return { message: "Ticket created" };
};
