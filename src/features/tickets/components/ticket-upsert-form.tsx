"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertTicket } from "../actions/create-ticket";

const TicketUpsertForm = ({
  id,
  title,
  description,
}: {
  id?: number;
  title?: string;
  description?: string;
}) => {
  const buttonDisplayName = id ? "Update" : "Create";

  const upsertTicketAction = async (formData: FormData) => {
    const data = {
      id: id,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
    };

    await upsertTicket(data);
  };

  return (
    <>
      <form action={upsertTicketAction} className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" type="text" defaultValue={title} />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="description">Content</Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={description}
          />
        </div>

        <Button type="submit">{buttonDisplayName}</Button>
      </form>
    </>
  );
};

export default TicketUpsertForm;
