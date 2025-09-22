import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import TicketCreateForm from "./ticket-create-form";

const TicketCreate = () => {
  return (
    <Card className="flex flex-col self-center mb-10 w-full max-w-[650px]">
      <CardHeader>
        <CardTitle>Create a new Ticket</CardTitle>
        <CardDescription>
          Fill in the details below to create a new ticket.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <TicketCreateForm></TicketCreateForm>
      </CardContent>
    </Card>
  );
};

export default TicketCreate;
