import initializeData from "@/data";
import { ticketPath } from "@/path";
import clsx from "clsx";
import Link from "next/link";

const TicketStatus = {
  OPEN: "O",
  IN_PROGRESS: "P",
  CLOSED: "C",
};

export default function Tickets() {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Tickets Page</h2>
        <p className="text-sm">Your tickets place to start</p>
      </div>

      <div className="flex flex-1 flex-col items-center">
        {initializeData.map((ticket) => (
          <div
            key={ticket.id}
            className="
              w-full max-w-[420px]
              border rounded p-4 my-2
              "
          >
            <div className="flex flex-1 justify-between mb-2">
              <h3 className="text-lg font-semibold truncate">{ticket.title}</h3>
              <span>{TicketStatus[ticket.status]}</span>
            </div>

            <div className="flex flex-1 justify-between">
              <p
                className={clsx("text-sm truncate w-full max-w-[300px]", {
                  "line-through text-gray-400": ticket.status === "CLOSED",
                })}
              >
                {ticket.description}
              </p>

              <div className="underline text-sm">
                <Link href={ticketPath(ticket.id)}>View</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
