export type TicketStatusType = "OPEN" | "IN_PROGRESS" | "CLOSED";

export type Ticket = {
  id: string;
  title: string;
  status: TicketStatusType;
  description: string;
};

export type TicketProps = {
  ticket: Ticket;
};
