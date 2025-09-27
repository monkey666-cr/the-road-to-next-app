import { PrismaClient, Ticket, TicketStatus } from "@prisma/client";
import { format } from "date-fns";

const prisma = new PrismaClient();

const tickets: Ticket[] = [
  {
    id: 1,
    title: "Fix login bug",
    description: "Users are unable to log in with correct credentials.",
    status: TicketStatus.OPEN,
    deadline: format(new Date(), "yyyy-MM-dd"),
    bounty: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const seed = async () => {
  const t0 = performance.now();
  console.log("Seeding database...");

  for (const ticket of tickets) {
    await prisma.ticket.upsert({
      where: { id: ticket.id },
      create: ticket,
      update: ticket,
    });
  }

  console.log("Seeding completed.");
  console.log(`Time taken: ${(performance.now() - t0).toFixed(2)} ms`);
};

seed();
