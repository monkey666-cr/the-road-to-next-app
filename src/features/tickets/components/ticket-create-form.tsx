"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createTicket } from "../actions/create-ticket";

const TicketCreateForm = () => {
  const createTicketAction = async (formData: FormData) => {
    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
    };

    await createTicket(data);
  };

  return (
    <>
      <form action={createTicketAction} className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" type="text" />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="description">Content</Label>
          <Textarea id="description" name="description" />
        </div>

        <Button type="submit">Create</Button>
      </form>
    </>
  );
};

export default TicketCreateForm;
