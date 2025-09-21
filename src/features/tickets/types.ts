import { getTicket } from "./queries/get-ticket";
import { getTickets } from "./queries/get-tickets";

export type TicketStatusType = "OPEN" | "IN_PROGRESS" | "CLOSED";

export type TicketItemProps = {
  ticket:
    | Awaited<ReturnType<typeof getTickets>>[number]
    | Awaited<ReturnType<typeof getTicket>>;
  isDetial?: boolean;
};
