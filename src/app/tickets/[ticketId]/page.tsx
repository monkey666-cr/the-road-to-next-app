import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Placeholder } from "@/components/ui/placeholder";
import initializeData from "@/data";
import TicketItem from "@/features/tickets/components/ticket-item";
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

      <div className="flex flex-col flex-1 items-center animate-fade-in-from-top">
        <TicketItem ticket={ticket} isDetial />
      </div>
    </>
  );
};

export default TicketPage;
