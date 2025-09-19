import { LucideCircleCheck, LucideFileText, LucidePencil } from "lucide-react";

const TicketStatus = {
  OPEN: <LucideFileText />,
  IN_PROGRESS: <LucidePencil />,
  CLOSED: <LucideCircleCheck />,
};

export { TicketStatus };
