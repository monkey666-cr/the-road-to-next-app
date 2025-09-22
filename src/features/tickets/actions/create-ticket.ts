"use server";

import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/path";
import { revalidatePath } from "next/cache";

export const createTicket = async ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  await prisma.ticket.create({
    data: {
      title: title,
      description: description,
    },
  });

  revalidatePath(ticketsPath);
};
