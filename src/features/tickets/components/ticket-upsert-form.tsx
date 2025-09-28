"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertTicket } from "../actions/upsert-ticket";
import { SubmitButton } from "@/components/form/submit-button";
import { Ticket } from "@prisma/client";
import { useActionState, useRef } from "react";
import { FieldError } from "@/components/form/utils/field-error";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Form } from "@/components/form/form";
import {
  DatePicker,
  type ImperativeHandlerFromDatePicker,
} from "@/components/data-picker";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE
  );
  const buttonDisplayName = ticket ? "Update" : "Create";

  const datePickerImperativeHandleRef = useRef<ImperativeHandlerFromDatePicker>(
    null!
  );

  const successHandle = () => {
    datePickerImperativeHandleRef.current?.reset();
  };

  return (
    <>
      <Form action={action} actionState={actionState} onSuccess={successHandle}>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-1">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="deadline">Deadline</Label>
            <DatePicker
              id="deadline"
              name="deadline"
              defaultValue={
                (actionState.payload?.get("deadline") as string) ??
                ticket?.deadline
              }
              imperativeHandleRef={datePickerImperativeHandleRef}
            />
            <FieldError actionState={actionState} name="deadline" />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="bounty">Bounty ($)</Label>
            <Input
              id="bounty"
              name="bounty"
              type="number"
              step=".01"
              defaultValue={
                (actionState.payload?.get("bounty") as string) ??
                (ticket?.bounty as number) / 100
              }
            />
            <FieldError actionState={actionState} name="bounty" />
          </div>
        </div>

        <SubmitButton label={buttonDisplayName}></SubmitButton>
      </Form>
    </>
  );
};

export default TicketUpsertForm;
