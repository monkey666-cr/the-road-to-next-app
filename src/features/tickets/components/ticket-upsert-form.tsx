"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertTicket } from "../actions/upsert-ticket";
import { SubmitButton } from "@/components/form/submit-button";
import { Ticket } from "@prisma/client";
import { useActionState } from "react";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    {
      message: "",
    }
  );
  const buttonDisplayName = ticket ? "Update" : "Create";

  return (
    <>
      <form action={action} className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            type="text"
            defaultValue={
              (actionState.payload?.get("title") as string) ?? ticket?.title
            }
          />
          <span className="text-xs text-red-500">
            {actionState.fieldErrors?.title?.[0]}
          </span>
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="description">Content</Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={
              (actionState.payload?.get("description") as string) ??
              ticket?.description
            }
          />
          <span className="text-xs text-red-500">
            {actionState.fieldErrors?.description?.[0]}
          </span>
        </div>

        <SubmitButton label={buttonDisplayName}></SubmitButton>

        {actionState.message}
      </form>
    </>
  );
};

export default TicketUpsertForm;
