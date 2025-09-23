"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertTicket } from "../actions/upsert-ticket";
import { SubmitButton } from "@/components/form/submit-button";
import { Ticket } from "@prisma/client";
import { useActionState } from "react";
import { FieldError } from "@/components/form/utils/field-error";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE
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
          <FieldError actionState={actionState} name="title" />
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
          <FieldError actionState={actionState} name="description" />
        </div>

        <SubmitButton label={buttonDisplayName}></SubmitButton>

        {actionState.message}
      </form>
    </>
  );
};

export default TicketUpsertForm;
