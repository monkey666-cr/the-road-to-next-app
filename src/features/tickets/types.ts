import { Ticket } from "@prisma/client";

export type TicketStatusType = "OPEN" | "IN_PROGRESS" | "CLOSED";

export type TicketItemProps = {
  ticket: Ticket;
  isDetial?: boolean;
};
