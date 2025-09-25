"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TicketStatus } from "@/features/tickets/constants";
import { ticketEditPath, ticketPath, ticketsPath } from "@/path";
import clsx from "clsx";
import Link from "next/link";
import { MouseEvent } from "react";
import { TicketItemProps } from "../types";
import {
  LucidePencil,
  LucideSquareArrowOutUpRight,
  LucideTrash2,
} from "lucide-react";
import { deleteTicket } from "../actions/delete-ticket";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { toCurrencyFromCent } from "@/utils/currency";

const TicketItem = ({ ticket, isDetial }: TicketItemProps) => {
  const pathname = usePathname();

  if (!ticket) {
    return null;
  }
  const deleteTicketHandle = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // 阻止 Link 的默认导航

    const res = await deleteTicket(ticket.id, pathname);
    if (res.message) {
      if (res.status === "SUCCESS") {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    }
  };

  return (
    <div
      className={clsx("flex flex-row justify-between items-start w-full mb-4", {
        "max-w-[420px]": !isDetial,
        "max-w-[800px]": isDetial,
      })}
    >
      {/* Ticket Card Info */}
      <Card key={ticket.id} className="w-full mr-2">
        <CardHeader>
          <CardTitle className="flex flex-row justify-between items-center">
            <span
              className={clsx("line-clamp-1 w-full", {
                "max-w-[250]": !isDetial,
                "max-w-[650]": isDetial,
              })}
            >
              {ticket.title}
            </span>
            <span>{TicketStatus[ticket.status]}</span>
          </CardTitle>
        </CardHeader>
        <CardContent
          className={clsx("text-sm w-full", {
            "line-through text-gray-400":
              ticket.status === "CLOSED" && !isDetial,
            "line-clamp-1": !isDetial,
            "max-w-[350]": !isDetial,
          })}
        >
          {ticket.description}
        </CardContent>

        <CardFooter className="flex flex-row justify-between">
          <p className="text-sm text-muted-foreground">{ticket.deadline}</p>
          <p className="text-sm text-muted-foreground">
            {toCurrencyFromCent(ticket.bounty || 0)}
          </p>
        </CardFooter>
      </Card>

      {/* right side bar button */}
      <div className="flex flex-col justify-between items-center max-h-[50px] mt-2">
        {isDetial ? (
          <Link
            href={ticketsPath}
            className="text-sm my-1.5"
            onClick={deleteTicketHandle}
          >
            <LucideTrash2 className="size-3.5" />
          </Link>
        ) : (
          <>
            <Link
              prefetch
              href={ticketPath(ticket.id)}
              className="text-sm my-1.5"
            >
              <LucideSquareArrowOutUpRight className="size-3.5" />
            </Link>
            <Link
              prefetch
              href={ticketEditPath(ticket.id)}
              className="text-sm my-1.5"
            >
              <LucidePencil className="size-3.5" />
            </Link>
            <Link
              href={ticketsPath}
              className="text-sm my-1.5"
              onClick={deleteTicketHandle}
            >
              <LucideTrash2 className="size-3.5" />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default TicketItem;
