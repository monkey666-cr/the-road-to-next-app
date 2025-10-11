import { hash } from "@node-rs/argon2";
import { PrismaClient, Ticket, TicketStatus } from "@prisma/client";
import { format } from "date-fns";

const prisma = new PrismaClient();

const users = [
  {
    username: "admin",
    email: "admin@admin.com",
  },
  {
    username: "user",
    email: "hello@road-to-next.com",
  },
];

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
    userId: "", // Placeholder, will be set during seeding
  },
];

const seed = async () => {
  const t0 = performance.now();
  console.log("Seeding database...");

  await prisma.ticket.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await hash("password123");
  const dbUsers = await prisma.user.createManyAndReturn({
    data: users.map((user) => ({ ...user, passwordHash })),
  });

  await prisma.ticket.createMany({
    data: tickets.map((ticket) => ({
      ...ticket,
      userId: dbUsers[0].id, // Assigning all tickets to the second user
    })),
  });

  console.log("Seeding completed.");
  console.log(`Time taken: ${(performance.now() - t0).toFixed(2)} ms`);
};

seed();
