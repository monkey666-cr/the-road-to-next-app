import { LucideCircleCheck, LucideFileText, LucidePencil } from "lucide-react";

const TicketStatus = {
  OPEN: <LucideFileText />,
  IN_PROGRESS: <LucidePencil />,
  CLOSED: <LucideCircleCheck />,
};

const TICKET_STATUS_LABELS = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  CLOSED: "Closed",
};

export { TicketStatus, TICKET_STATUS_LABELS };
