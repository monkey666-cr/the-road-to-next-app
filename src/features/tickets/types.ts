import { Prisma } from "@prisma/client";

export type TicketStatusType = "OPEN" | "IN_PROGRESS" | "CLOSED";

export type TicketItemProps = {
  ticket: Prisma.TicketGetPayload<{
    include: { User: { select: { username: true } } };
  }>;
  isDetail?: boolean;
};
