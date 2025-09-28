"use client";

import { Ticket, TicketStatus } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TICKET_STATUS_LABELS } from "../constants";
import { updateTicketStatus } from "../actions/update-ticket-status";
import { toast } from "sonner";
import { LucideTrash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { deleteTicket } from "../actions/delete-ticket";
import { usePathname } from "next/navigation";

type TicketMoreMenuProps = {
  ticket: Ticket;
  trigger: React.ReactNode;
};

const TicketMoreMenu = ({ ticket, trigger }: TicketMoreMenuProps) => {
  const pathname = usePathname();
  const handleUpdateTicketStatus = async (value: string) => {
    if (ticket.status == value) {
      return;
    }

    const promise = updateTicketStatus(ticket.id, value);
    toast.promise(promise, {
      loading: "Updating status...",
    });

    const result = await promise;

    if (result.status === "ERROR") {
      toast.error(result.message);
    } else if (result.status === "SUCCESS") {
      toast.success(result.message);
    }
  };

  const handleDeleteTicket = async () => {
    const promise = deleteTicket(ticket.id, pathname);
    toast.promise(promise, {
      loading: "Deleting Ticket...",
    });
    const result = await promise;

    return result;
  };

  const ticketStatusRadioGroupItems = (
    <DropdownMenuRadioGroup
      value={ticket.status}
      onValueChange={handleUpdateTicketStatus}
    >
      {(Object.keys(TICKET_STATUS_LABELS) as Array<TicketStatus>).map((key) => (
        <DropdownMenuRadioItem key={key} value={key}>
          {TICKET_STATUS_LABELS[key]}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent side="right">
        {ticketStatusRadioGroupItems}
        <DropdownMenuSeparator />

        <ConfirmDialog
          action={handleDeleteTicket}
          trigger={
            <DropdownMenuItem
              className="flex items-center gap-2 cursor-pointer my-1.5 px-3 py-1.5"
              onSelect={(e) => e.preventDefault()}
            >
              <LucideTrash2 className="size-3.5" />
              <span className="text-sm">Delete</span>
            </DropdownMenuItem>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { TicketMoreMenu };
