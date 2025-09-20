import { initializeData } from "@/data";
import { Ticket } from "../types";

export const getTickets = async (): Promise<Ticket[]> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return new Promise<typeof initializeData>((resolve) => {
    resolve(initializeData);
  });
};
