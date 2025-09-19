import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Placeholder } from "@/components/ui/placeholder";
import initializeData from "@/data";
import { ticketsPath } from "@/path";
import Link from "next/link";

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketPage = async (props: TicketPageProps) => {
  const params = await props.params;
  const ticketId = params.ticketId;

  const ticket = initializeData.find((ticket) => ticket.id === ticketId);

  if (!ticket) {
    return (
      <Placeholder
        label="Ticket not found"
        button={
          <Button asChild variant="outline">
            <Link href={ticketsPath}>Go to Tickets</Link>
          </Button>
        }
      />
    );
  }

  return (
    <>
      <Heading title="Ticket Details" />

      <h1>{ticket?.title}</h1>
      <span>{ticket?.description}</span>
    </>
  );
};

export default TicketPage;
