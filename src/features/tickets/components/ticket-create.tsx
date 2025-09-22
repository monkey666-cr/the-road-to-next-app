import TicketCreateForm from "./ticket-create-form";
import { CardCompact } from "@/components/card-comopact";

const TicketCreate = () => {
  return (
    <CardCompact
      title="Create a new Ticket"
      description="Fill in the details below to create a new ticket..."
      className="flex flex-col self-center mb-10 w-full max-w-[650px]"
      content={<TicketCreateForm />}
    />
  );
};

export default TicketCreate;
