"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertTicket } from "../actions/create-ticket";
import { useTransition } from "react";
import { LucideLoaderCircle } from "lucide-react";
import { sleep } from "@/lib/utils";

const TicketUpsertForm = ({
  id,
  title,
  description,
}: {
  id?: number;
  title?: string;
  description?: string;
}) => {
  const [isPending, startTransition] = useTransition();

  const buttonDisplayName = id ? "Update" : "Create";

  const upsertTicketAction = async (formData: FormData) => {
    startTransition(async () => {
      await sleep(3000);

      const data = {
        id: id,
        title: formData.get("title") as string,
        description: formData.get("description") as string,
      };

      await upsertTicket(data);
    });
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

        <Button disabled={isPending} type="submit">
          {isPending && (
            <LucideLoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          )}
          {buttonDisplayName}
        </Button>
      </form>
    </>
  );
};

export default TicketUpsertForm;
