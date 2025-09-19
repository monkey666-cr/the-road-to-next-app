import initializeData from "@/data";
import { ticketPath } from "@/path";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import clsx from "clsx";
import Link from "next/link";

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
    />
  </svg>
);

const TicketStatus = {
  OPEN: <CheckIcon />,
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

      <div className="flex flex-1 flex-col items-center animate-fade-in-from-top">
        {initializeData.map((ticket) => (
          <Card key={ticket.id} className="w-full max-w-[420px] mb-4">
            <CardHeader>
              <CardTitle className="flex flex-row justify-between items-center">
                <span className="line-clamp-1 w-full max-w-[250]">{ticket.title}</span>
                <span>{TicketStatus[ticket.status]}</span>
              </CardTitle>
            </CardHeader>
            <CardContent
              className={clsx("text-sm line-clamp-1 w-full max-w-[350]", {
                "line-through text-gray-400": ticket.status === "CLOSED",
              })}
            >
              {ticket.description}
            </CardContent>
            <CardFooter className="justify-end">
              <Link href={ticketPath(ticket.id)} className="underline text-sm">
                View
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
