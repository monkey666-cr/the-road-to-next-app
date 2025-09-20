import { Ticket } from "./features/tickets/types";

const initializeData: Ticket[] = [
  {
    id: "1",
    title:
      "First Ticket, First Ticket, First Ticket, First Ticket, First Ticket, First Ticket, First Ticket, First Ticket, ",
    description:
      "This is the first ticket. This is the first ticket.This is the first ticket. This is the first ticket.",
    status: "OPEN" as const,
  },
  {
    id: "2",
    title: "Second Ticket",
    description: "This is the second ticket.",
    status: "IN_PROGRESS" as const,
  },
  {
    id: "3",
    title: "Thrid Ticket",
    description: "This is the third ticket.",
    status: "CLOSED" as const,
  },
];

export { initializeData };
