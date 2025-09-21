import { Ticket } from "../types";
import { initializeData } from "@/data";

export const getTicket = async (ticketId: string): Promise<Ticket | null> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const ticket = initializeData.find((ticket) => ticket.id === ticketId);
  if (!ticket) {
    return null;
  }

  return ticket;
};
