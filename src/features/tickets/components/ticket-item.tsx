"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TicketStatus } from "@/features/tickets/constants";
import { ticketPath, ticketsPath } from "@/path";
import clsx from "clsx";
import Link from "next/link";
import { TicketItemProps } from "../types";
import { LucideSquareArrowOutUpRight, LucideTrash2 } from "lucide-react";
import { deleteTicket } from "../actions/delete-ticket";
import { Button } from "@/components/ui/button";

const TicketItem = ({ ticket, isDetial }: TicketItemProps) => {
  if (!ticket) {
    return null;
  }

  console.log("Render Ticket Item:", ticket.id);

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
      </Card>

      {/* right side bar button */}
      <div className="flex flex-col justify-between items-center max-h-[50px] mt-2">
        {isDetial ? (
          <Link
            href={ticketsPath}
            className="text-sm my-1.5"
            onClick={async (e) => {
              e.preventDefault(); // 阻止 Link 的默认导航

              await deleteTicket(ticket.id);
            }}
          >
            <LucideTrash2 className="size-3.5" />
          </Link>
        ) : (
          <Link
            prefetch
            href={ticketPath(ticket.id)}
            className="text-sm my-1.5"
          >
            <LucideSquareArrowOutUpRight className="size-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default TicketItem;
