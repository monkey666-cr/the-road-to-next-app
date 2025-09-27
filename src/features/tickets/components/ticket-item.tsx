"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TicketStatus } from "@/features/tickets/constants";
import { ticketEditPath, ticketPath } from "@/path";
import clsx from "clsx";
import Link from "next/link";
import { TicketItemProps } from "../types";
import {
  LucideMoreVertical,
  LucidePencil,
  LucideSquareArrowOutUpRight,
} from "lucide-react";
import { toCurrencyFromCent } from "@/utils/currency";
import { Button } from "@/components/ui/button";
import { TicketMoreMenu } from "./ticket-more-menu";

const TicketItem = ({ ticket, isDetial }: TicketItemProps) => {
  if (!ticket) {
    return null;
  }

  const detailButton = () => {
    return (
      <Button variant="outline" size="icon" className="my-1.5">
        <Link prefetch href={ticketPath(ticket.id)} className="text-sm">
          <LucideSquareArrowOutUpRight className="size-3.5" />
        </Link>
      </Button>
    );
  };

  const editButton = () => {
    return (
      <Button variant="outline" size="icon" className="my-1.5">
        <Link prefetch href={ticketEditPath(ticket.id)} className="text-sm">
          <LucidePencil className="size-3.5" />
        </Link>
      </Button>
    );
  };

  const moreMenuButton = () => {
    return (
      <TicketMoreMenu
        ticket={ticket}
        trigger={
          <Button variant="outline" size="icon" className="my-1.5">
            <LucideMoreVertical className="h-4 w-4" />
          </Button>
        }
      />
    );
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
          <>
            {editButton()}
            {moreMenuButton()}
          </>
        ) : (
          <>
            {detailButton()}
            {editButton()}
            {moreMenuButton()}
          </>
        )}
      </div>
    </div>
  );
};

export default TicketItem;
